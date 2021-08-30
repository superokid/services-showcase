-- last 30 days user trade

select * from trade
where trade.buyer_user_id = :user_id
and trade.created_on > NOW() - INTERVAL '30 DAYS'
or trade.seller_user_id = :user_id
and trade.created_on > NOW() - INTERVAL '30 DAYS'

select * from trade
where trade.buyer_user_id = :user_id
and trade.created_on > NOW() - INTERVAL '30 DAYS'
union
select * from trade
where trade.seller_user_id = :user_id
and trade.created_on > NOW() - INTERVAL '30 DAYS'
order by created_on

