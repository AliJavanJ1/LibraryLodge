from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = 'postgresql://kamyar:1234@localhost/Tahlil'
SQLALCHEMY_DATABASE_URL = "postgresql://myuserdrive:mypass@127.0.0.1/drive"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# from sqlalchemy import create_engine
#
# # create a connection to the new database with the new user
# engine = create_engine('postgresql://kamyar:1234@localhost/Tahlil', echo=True)
#
# # execute an example query
# result = engine.execute("select * from restaurant")
#
# # print the results
# for row in result:
#     print(row)
#
# # close the connection
# engine.dispose()

