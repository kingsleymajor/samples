create database todo;

--\c into todo

create table myschooltable(
    st_id serial primary key,
    st_age varchar(240),
    st_course varchar(240),
    st_reg varchar(240)
);