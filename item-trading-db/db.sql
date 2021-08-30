CREATE TABLE "trade"  (
  id serial PRIMARY KEY,
  buyer_user_id integer NOT NULL,
  seller_user_id integer NOT NULL,
  buyer_item_id VARCHAR(16) NOT NULL,
  seller_item_id VARCHAR(16) NOT NULL,
  buyer_quantity integer default null,
  seller_quantity integer default null,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user_inventory"  (
  id serial PRIMARY KEY,
  user_id VARCHAR(16) NOT NULL,
  item_id VARCHAR(16) NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE "item" (
  id VARCHAR not null
);

CREATE TABLE "user" (
  id serial PRIMARY KEY,
  username varchar not null
);

INSERT INTO "user" (id, username) VALUES (123456789, 'user1');
INSERT INTO "user" (id, username) VALUES (987654321, 'user2');

INSERT INTO "item" (id) VALUES ('credits_1000');
INSERT INTO "item" (id) VALUES ('test_item');

insert into "trade" (buyer_user_id, seller_user_id, buyer_item_id, seller_item_id, buyer_quantity, seller_quantity)
values (123456789, 987654321, 'credits_1000', 'test_item', 4, 1);
