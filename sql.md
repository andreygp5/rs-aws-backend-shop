## SQL to create tables

create table products (
    id uuid not null unique default uuid_generate_v4() primary key,
    title text not null,
    description text,
    price integer not null
);

create table stock (
    product_id uuid,
    count integer not null default 0,
    foreign key (product_id) references products(id)
);

create table media (
    product_id uuid,
    url text not null,
    foreign key (product_id) references products(id)
);

## SQL to fill data

**Products table**

insert into products (title, description, price)
            values('Product 1', 'Description 1', 30),
                    ('Product 2', 'Description 2', 40),
                    ('Product 3', 'Description 3', 50),
                    ('Product 4', 'Description 4', 60)

**Stock table**

WITH ins (title, count) AS
    (VALUES
        ('Product 1', 2),
        ('Product 2', 3),
        ('Product 3', 2),
        ('Product 4', 3)
    )
    INSERT INTO stock (product_id, count)
    SELECT products.id, ins.count
    FROM products
        JOIN ins
            ON ins.title = products.title;

**Media table**

WITH ins (title, url) AS
    (VALUES
        ('Product 1', 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80'),
        ('Product 2', 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80'),
        ('Product 3', 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80'),
        ('Product 4', 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80')
    )
    INSERT INTO media (product_id, url)
    SELECT products.id, ins.url
    FROM products
        JOIN ins
            ON ins.title = products.title;