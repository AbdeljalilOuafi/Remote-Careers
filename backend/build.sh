set -o errexit

pip install -r backend/requirements.txt

python backend/manage.py migrate

# if [[ $CREATE_SUPERUSER == "True" ]]; then
#     python backend/manage.py createsuperuser --no-input \
#         --email "$DJANGO_SUPERUSER_EMAIL" \
#         --first_name "${DJANGO_SUPERUSER_FIRST_NAME}" \
#         --last_name "${DJANGO_SUPERUSER_LAST_NAME}"
#     echo "Superuser created."
# fi
