CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `compania` varchar(200) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `clave` varchar(200) NOT NULL, 
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;