set -o errexit

pip install -r backend/requirements.txt

python backend/manage.py migrate
