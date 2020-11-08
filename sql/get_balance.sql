CREATE DEFINER=`admin`@`localhost` PROCEDURE `get_account_balance`(account_id int)
BEGIN
	DECLARE added int;
    DECLARE deposited int;
	SELECT 
    sum(amount)
INTO added FROM
    `transactions` WHERE `transactions`.`to` = account_id;
    
    SELECT 
    sum(amount)
INTO deposited FROM
    `transactions` WHERE `transactions`.`from` = account_id;
    
    SELECT (added - deposited) AS `balance`;
END