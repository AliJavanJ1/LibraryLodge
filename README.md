# LibraryLodge

This repo contains the implementation of the customizable library system where you can store any type of file with its necessary attachments. The implementation is done in python using fastapi.

To run the backend of the project first you need to create a virtual environment and then install the necessary python packages using the following command:

```bash
pip3 install -r backend/requirements.txt
```

Then you need to install and setup the postgreSQL as the backbone database using the following commands:

```bash
# get postgresql app for macos
wget https://get.enterprisedb.com/postgresql/postgresql-<version>-osx.dmg
# or other OSs
# then installing the app

sudo -u postgres psql
# this should transfer the shell to the one of postgre's
```
```bash
# in the new shell
create database drive;
create user myuserdrive with encrypted password 'mypass';
grant all privileges on database drive to myuserdrive;
```
