set -o errexit

pip install -r backend/requirements.txt

python backend/manage.py migrate

if [[ $CREATE_SUPERUSER == "True" ]]; then
    python backend/manage.py createsuperuser --no-input \
        --username "$DJANGO_SUPERUSER_USERNAME" \
        --email "$DJANGO_SUPERUSER_EMAIL" \
        --first_name "Admin" \  # You can set a default first name
        --last_name "User"      # You can set a default last name
    echo "Superuser created."
fi
