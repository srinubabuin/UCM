SET DEFINE OFF;
/
DECLARE
TABLECHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('USERS');
    IF TABLECHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE TABLE USERS(ID  NUMBER NOT NULL ENABLE,
            LOGIN_ID VARCHAR2(64) NOT NULL,
            PASSWORD VARCHAR2(256) NOT NULL,
            ROLE VARCHAR2(64) NOT NULL,
            CONSTRAINT USER_ID_PK PRIMARY KEY(ID),
            CONSTRAINT LOGIN_ID_IK UNIQUE(LOGIN_ID))';
    END IF;
END;
/

DECLARE
SEQCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('USER_ID_SEQ');
    IF SEQCHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE SEQUENCE USER_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
    END IF;
END;
/

DECLARE
TRIGCHECKERFLAG INT; 
BEGIN
    SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('USER_ID_INSERT');
    IF TRIGCHECKERFLAG = 0  THEN
        EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "USER_ID_INSERT" BEFORE INSERT ON USERS FOR EACH ROW BEGIN SELECT USER_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
        EXECUTE IMMEDIATE 'ALTER TRIGGER  "USER_ID_INSERT" ENABLE';
    END IF;
END;
/   

DECLARE
ROWCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  ROWCHECKERFLAG FROM USERS;
    IF ROWCHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'INSERT INTO USERS (LOGIN_ID, PASSWORD, ROLE) VALUES (''admin'', ''HeVYpon/1G8='',''ADMIN'')';
        EXECUTE IMMEDIATE 'INSERT INTO USERS (LOGIN_ID, PASSWORD, ROLE) VALUES (''director'', ''gTeLB7DkjExU+txu8nmQgg=='',''DIRECTOR'')';
    END IF;
END;
/


DECLARE
TABLECHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('STUDENT_QUESTIONNAIRE');
    IF TABLECHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE TABLE STUDENT_QUESTIONNAIRE(QUESTION_DETAILS VARCHAR2(4000) NULL)';
    END IF;
END;
/

DECLARE
  TABLECHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('COURCES');
  IF TABLECHECKERFLAG = 0 THEN
    EXECUTE IMMEDIATE 'CREATE TABLE COURCES(ID NUMBER NOT NULL ENABLE,
                    NAME VARCHAR2(64) NOT NULL,
                    PREFIX VARCHAR2(16) NOT NULL,
                    CODE VARCHAR2(16) NOT NULL,
                    STATUS VARCHAR2(64) NOT NULL,
                    NOTES VARCHAR2(400) NULL,
                    CREATED_DATE TIMESTAMP(6) NOT NULL,
                    CONSTRAINT COURCE_ID_PK PRIMARY KEY(ID),
                    CONSTRAINT COUR_UNQ_NAME UNIQUE(NAME),
                    CONSTRAINT COUR_UNQ_PREFIX UNIQUE(PREFIX),
                    CONSTRAINT COUR_UNQ_CODE UNIQUE(CODE))';
  END IF;
END;
/
DECLARE
  SEQCHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('COURCE_ID_SEQ');
  IF SEQCHECKERFLAG = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE COURCE_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
  END IF;
END;
/
DECLARE
  TRIGCHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('COURCE_ID_INSERT');
  IF TRIGCHECKERFLAG = 0  THEN
    EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "COURCE_ID_INSERT" BEFORE INSERT ON COURCES FOR EACH ROW BEGIN SELECT COURCE_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
    EXECUTE IMMEDIATE 'ALTER TRIGGER  "COURCE_ID_INSERT" ENABLE';
  END IF;
END;
/

DECLARE
TABLECHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('ADVISORS');
    IF TABLECHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE TABLE ADVISORS(ID NUMBER NOT NULL ENABLE,
                    LOGIN_ID VARCHAR2(64) NOT NULL,
                    NAME VARCHAR2(128) NOT NULL,
                    MAIL VARCHAR2(128) NOT NULL,
                    PHONE VARCHAR2(128) NOT NULL,
                    NOTES VARCHAR2(400) NULL,
                    STATUS VARCHAR2(64) NOT NULL,
                    CREATED_DATE TIMESTAMP(6) NOT NULL,
                    CONSTRAINT ADV_MAIL_Uk UNIQUE(MAIL),
                    CONSTRAINT ADV_PHONE_Uk UNIQUE(PHONE),
                    CONSTRAINT ADVISOR_ID_PK PRIMARY KEY(ID))';
    END IF;
END;
/
DECLARE
SEQCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('ADVISOR_ID_SEQ');
    IF SEQCHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE SEQUENCE ADVISOR_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
    END IF;
END;
/
DECLARE
TRIGCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('ADVISOR_ID_INSERT');
    IF TRIGCHECKERFLAG = 0  THEN
        EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "ADVISOR_ID_INSERT" BEFORE INSERT ON ADVISORS FOR EACH ROW BEGIN SELECT ADVISOR_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
        EXECUTE IMMEDIATE 'ALTER TRIGGER  "ADVISOR_ID_INSERT" ENABLE';
    END IF;
END;
/

DECLARE
TABLECHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('CONCENTRATIONS');
    IF TABLECHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE TABLE CONCENTRATIONS(ID NUMBER NOT NULL ENABLE,
                    NAME VARCHAR2(128) NOT NULL,
                    ADVISOR_ID NUMBER NULL,
                    STATUS VARCHAR2(64) NOT NULL,
                    NOTES VARCHAR2(400) NULL,
                    CREATED_DATE TIMESTAMP(6) NOT NULL,
                    CONSTRAINT CON_NAME_UK UNIQUE(NAME),
                    CONSTRAINT CONCENTATION_ID_PK PRIMARY KEY(ID),
                    CONSTRAINT CON_ADVISOR_ID_FK FOREIGN KEY(ADVISOR_ID) REFERENCES ADVISORS(ID) ON DELETE SET NULL)';
    END IF;
END;
/
DECLARE
SEQCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('CONCENTATION_ID_SEQ');
    IF SEQCHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE SEQUENCE CONCENTATION_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
    END IF;
END;
/
DECLARE
TRIGCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('CONCENTRATION_ID_INSERT');
    IF TRIGCHECKERFLAG = 0  THEN
        EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "CONCENTRATION_ID_INSERT" BEFORE INSERT ON CONCENTRATIONS FOR EACH ROW BEGIN SELECT CONCENTATION_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
        EXECUTE IMMEDIATE 'ALTER TRIGGER  "CONCENTRATION_ID_INSERT" ENABLE';
    END IF;
END;
/

DECLARE
  TABLECHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('CONCENTRATION_COURCES');
  IF TABLECHECKERFLAG = 0 THEN
    EXECUTE IMMEDIATE 'CREATE TABLE CONCENTRATION_COURCES(ID NUMBER NOT NULL ENABLE,
                    CONCENTRATION_ID NUMBER NOT NULL,
                    COURCE_ID NUMBER NOT NULL,
                    STATUS VARCHAR2(64) NOT NULL,
                    CREATED_DATE TIMESTAMP(6) NOT NULL,
                    CONSTRAINT CON_COURCE_ID_PK PRIMARY KEY(ID),
                    CONSTRAINT CON_CRSE_CON_ID_CRS_ID_UK UNIQUE(CONCENTRATION_ID,COURCE_ID),
                    CONSTRAINT CON_CRSE_CON_ID_FK FOREIGN KEY(CONCENTRATION_ID) REFERENCES CONCENTRATIONS(ID) ON DELETE CASCADE,
                    CONSTRAINT CON_CRSE_COURSE_ID_FK FOREIGN KEY(COURCE_ID) REFERENCES COURCES(ID) ON DELETE CASCADE)';
  END IF;
END;
/
DECLARE
  SEQCHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('CON_COURCE_ID_SEQ');
  IF SEQCHECKERFLAG = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE CON_COURCE_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
  END IF;
END;
/
DECLARE
  TRIGCHECKERFLAG INT;
BEGIN
  SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('CON_COURCE_ID_INSERT');
  IF TRIGCHECKERFLAG = 0  THEN
    EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "CON_COURCE_ID_INSERT" BEFORE INSERT ON CONCENTRATION_COURCES FOR EACH ROW BEGIN SELECT CON_COURCE_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
    EXECUTE IMMEDIATE 'ALTER TRIGGER  "CON_COURCE_ID_INSERT" ENABLE';
  END IF;
END;
/

DECLARE
TABLECHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO  TABLECHECKERFLAG FROM USER_TABLES WHERE TABLE_NAME = UPPER('STUDENTS');
    IF TABLECHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE TABLE STUDENTS(ID NUMBER NOT NULL ENABLE,
                LOGIN_ID VARCHAR2(64) NOT NULL,
                FIRST_NAME VARCHAR2(64) NOT NULL,
                LAST_NAME VARCHAR2(64) NOT NULL,
                MAIL VARCHAR2(128) NOT NULL,
                SECONDARYEMAIL VARCHAR2(128) NULL,
                PHONE VARCHAR2(128) NOT NULL,
                ADDRESS VARCHAR2(1000) NULL,
                SCORES  VARCHAR2(1000) NULL,
                CONCENTRATION_ID NUMBER NOT NULL,
                STUDENTSTATUS VARCHAR2(64) NULL,
                STUDENTSTATUS_DATE TIMESTAMP(6) NULL,
                STATUS VARCHAR2(64) DEFAULT ''ACTIVE'' NOT NULL ,
                TESTDETAILS VARCHAR2(4000) NULL,
                ACCEPTEDCODEOFCONDUCT VARCHAR2(64) NULL ,
                PREREQS varchar2(64) NULL ,
                NOTES VARCHAR2(400) NULL,
                NOTES_UPDATED TIMESTAMP(6) NULL,
                CREATED_DATE TIMESTAMP(6) NOT NULL,
                CONSTRAINT STU_MAIL_Uk UNIQUE(MAIL),
                CONSTRAINT STU_PHONE_Uk UNIQUE(PHONE),
                CONSTRAINT STUDENT_ID_PK PRIMARY KEY(ID),
                CONSTRAINT STUDENT_CON_ID_FK FOREIGN KEY(CONCENTRATION_ID) REFERENCES CONCENTRATIONS(ID) ON DELETE CASCADE)';
    END IF;
END;
/
DECLARE
SEQCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO SEQCHECKERFLAG FROM USER_SEQUENCES WHERE SEQUENCE_NAME = UPPER('STUDENT_ID_SEQ');
    IF SEQCHECKERFLAG = 0 THEN
        EXECUTE IMMEDIATE 'CREATE SEQUENCE STUDENT_ID_SEQ MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE';
    END IF;
END;
/
DECLARE
TRIGCHECKERFLAG INT;
BEGIN
    SELECT COUNT(*) INTO TRIGCHECKERFLAG FROM USER_TRIGGERS WHERE TRIGGER_NAME = UPPER('STUDENT_ID_INSERT');
    IF TRIGCHECKERFLAG = 0  THEN
        EXECUTE IMMEDIATE 'CREATE OR REPLACE TRIGGER  "STUDENT_ID_INSERT" BEFORE INSERT ON STUDENTS FOR EACH ROW BEGIN SELECT STUDENT_ID_SEQ.NEXTVAL INTO :new.ID FROM DUAL; END;';
        EXECUTE IMMEDIATE 'ALTER TRIGGER  "STUDENT_ID_INSERT" ENABLE';
    END IF;
END;
/

COMMIT;
/
