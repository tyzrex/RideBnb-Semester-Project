CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table customer(
    customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    customername varchar(100) not null,
    password varchar(100) not null,
    email varchar(100) not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    phone_number varchar(100) not null,
    address varchar(100) not null,
    role varchar(100) not null DEFAULT 'customer'
);

CREATE table vehicle_post(
    vehicle_post_id serial primary key,
    customer_id uuid not null,
    vehicle_name varchar(50) not null,
    vehicle_type varchar(50) not null,
    vehicle_brand varchar(50) not null,
    vehicle_year varchar(50) not null,
    vehicle_color varchar(50) not null,
    vehicle_description text not null,
    address varchar(50) not null,
    vehicle_image text[],
    created_at timestamp default now(),
    available boolean default true,
    price_per_day DECIMAL(10,2) not null,
    foreign key (customer_id) references customer(customer_id) on delete cascade
);


create table booking(
    booking_id serial primary key,
    customer_id int not null,
    vehicle_post_id int not null,
    total_cost DECIMAL(10,2) not null,
    booking_status varchar(50) not null,
    payment_status varchar(50) not null,
    created_at timestamp default now(),
    start_date date not null,
    end_date date not null,
    total_price DECIMAL(10,2) not null,
    foreign key (customer_id) references customer(customer_id),
    foreign key (vehicle_post_id) references vehicle_post(vehicle_post_id)
);

CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer(customer_id),
  booking_id INTEGER REFERENCES booking(booking_id),
  transaction_type VARCHAR(20) NOT NULL,
  transaction_status VARCHAR(20) NOT NULL,
  amount NUMERIC(8,2) NOT NULL
);

create table vehicle_review(
    vehicle_review_id serial primary key,
    customer_id int not null,
    vehicle_post_id int not null,
    review varchar(50) not null,
    rating int not null,
    created_at timestamp default now(),
    foreign key (customer_id) references customer(customer_id),
    foreign key (vehicle_post_id) references vehicle_post(vehicle_post_id)
);

create table message(
    message_id serial primary key,
    customer_id int not null,
    vehicle_post_id int not null,
    message varchar(50) not null,
    created_at timestamp default now(),
    foreign key (customer_id) references customer(customer_id),
    foreign key (vehicle_post_id) references vehicle_post(vehicle_post_id)
);