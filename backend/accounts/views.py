from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializer import *

from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user, resend_email
from .models import OnetimePassword
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import generics, permissions
from .models import User, Profile
from rest_framework.parsers import MultiPartParser, FormParser


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            #use celery in prod
            resend_email(user['email'])
            return Response({'status': 'OK', 'user': user}, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        optcode = request.data.get("opt")
        try:
            code_obj = OnetimePassword.objects.get(code=optcode)
            user = code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    'status': 'OK',
                    'detail': 'account email verified successfully'
                }, status.HTTP_200_OK)
            return Response({'status': 'NOT_OK',
                             'detail': 'User already verified, code is expired'}, status.HTTP_204_NO_CONTENT)
        except OnetimePassword.DoesNotExist:
            return Response({'status': 'NOT_OK',
                             'detail': 'invalid code'})


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status.HTTP_200_OK)

class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "status": f"You are corrently logged in as {user.fullname}"
        }
        return Response(data, status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    serializer_class=PasswordResetRequestSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'we have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordResetConfirm(GenericAPIView):

    def get(self, request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'credentials is valid', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordView(GenericAPIView):
    serializer_class=SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':"password reset is succesful"}, status=status.HTTP_200_OK)

class LogoutApiView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PrivateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfilePrivateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user.profile

# class PublicProfileView(generics.RetrieveAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = ProfilePublicSerializer
#     lookup_field = 'user__id'


