-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 07 2017 г., 12:26
-- Версия сервера: 5.5.58-0ubuntu0.14.04.1
-- Версия PHP: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `box-case`
--

-- --------------------------------------------------------

--
-- Структура таблицы `aukcion`
--

CREATE TABLE IF NOT EXISTS `aukcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Дамп данных таблицы `aukcion`
--

INSERT INTO `aukcion` (`id`) VALUES
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24);

-- --------------------------------------------------------

--
-- Структура таблицы `aukcion_items`
--

CREATE TABLE IF NOT EXISTS `aukcion_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auc_id` int(11) NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `image` varchar(1024) CHARACTER SET utf8 NOT NULL,
  `price` int(11) NOT NULL,
  `desc` varchar(2048) CHARACTER SET utf8 NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated__at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Дамп данных таблицы `aukcion_items`
--

INSERT INTO `aukcion_items` (`id`, `auc_id`, `name`, `image`, `price`, `desc`, `created_at`, `updated__at`) VALUES
(2, 3, 'Наушники SONY Extra Bass', '/build/items/usb-flash-stars-wars.png', 600, 'Длина кабеля 120 см. Разъем 3,5 угловой. Отличные басы.', '2017-12-07 14:50:32', '0000-00-00 00:00:00'),
(3, 4, 'Экшн камера', '/build/items/go-pro.png', 2000, 'Особенности: - Порадует Вас хорошим качеством съемки видео при низких затратах на ее покупку. - Вы сможете снимать видео даже на глубине до 30 метров. - Главный плюс данной камеры - низкая стоимость и хороший комплект базовой поставки, включающий множество различных креплений, ремешков, которые несомненно, пригодятся в эксплуатации камеры.', '2017-12-07 14:51:36', '0000-00-00 00:00:00'),
(4, 5, 'Powerbank 12 000 mAh', '/build/items/powerbank10mph.png', 1000, 'Одним из главных параметров зарядных устройств является ЕМКОСТЬ АККУМУЛЯТОРА, так как на зарядку современного телефона уходит примерно 2000-3000 mAh, планшета 7000-8000 mAh. Исходя из этих данных становится понятным, что зарядные устройства емкостью 5000-8000 mAh - пустая трата денег, времени и сил. Зарядка на солнечных батареях емкостью 20000 mAh - оптимальный выбор.', '2017-12-07 14:53:23', '0000-00-00 00:00:00'),
(5, 6, 'Bluetooth мини-колонка бумбокс', '/build/items/bloototh-caixa.png', 600, 'LED Портативная bluetooth-колонка беспроводной динамик для громкой связи с TF USB FM MIC blutooth подойдет для мобильных телефонов iPhone 6 7 s', '2017-12-07 14:57:37', '0000-00-00 00:00:00'),
(6, 7, 'Blutooth колонка led', '/build/items/blototh-kolonka-green.png', 550, 'LED Портативная bluetooth-колонка беспроводной динамик для громкой связи с TF USB FM MIC blutooth подойдет для мобильных телефонов iPhone 6 7 s', '2017-12-07 14:58:27', '0000-00-00 00:00:00'),
(7, 8, 'Kangertech Kit Box набор для вейп', '/build/items/kangertech.png', 3000, 'Технические характеристики: — диапазон регулируемой мощности от 5 до 80W; — поддерживаемое сопротивление атомайзера – от 0.1 до 2.5 ohm; — поддерживаемые типы проволоки в режиме термо контроля — Ni200 / Ti / SS; — температурный лимит от 200 до 600 градусов Фаренгейта (93 – 315.5 Цельсия); — источник питания — 1х18650.', '2017-12-07 15:10:01', '0000-00-00 00:00:00'),
(8, 9, 'Игровые наушники Owan X-7', '/build/items/owan.png', 1200, 'Основные особенности: OVANN X7 профессиональные игровые гарнитуры Турбина предназначена чашка уха, выглядит супер круто Накладные наушники кожа Earmuff для шумоизоляции Супер бас обеспечивает превосходный игровой опыт On-шнура управления, контроля и поддержки голосовой регулировки громкости Всенаправленный микрофон для четкого голоса', '2017-12-07 15:15:48', '0000-00-00 00:00:00'),
(9, 10, 'IWO Спинер  с диодной подсветкой', 'http://box-case.ru/build/items/iwo-spiner.png', 500, '100% высокое качество! прочный и надежный спинер. идеальный размер подходит для взрослых и детей. Легко носить с собой. маленький, простой.', '2017-12-07 15:18:35', '0000-00-00 00:00:00'),
(10, 11, 'Электронная сигарета Joyetech eGo Aio', '/build/items/vape-ego.png', 700, 'ПРЕИМУЩЕСТВА JOYETECH EGO AIO Модель является флагманом в своей ценовой категории, а потому обладает целым рядом очень интересных преимуществ. Их использование позволяет выйти за рамки стандартного понятия электронной сигареты и помогает подчеркнуть индивидуальность владельца. Компактный размер С учётом дриптиа длина устройства составляет всего 118 мм. Это почти в 1,5 раза короче стандартной шариковой ручки. Изготовление столь компактных средств стало возможным с реализацией технологии All-In-One.', '2017-12-07 15:19:11', '0000-00-00 00:00:00'),
(11, 12, 'Радар детектор «анти стрелка»', '/build/items/radar-detektor.png', 2200, 'Язык: английский, русский Интерфейс: Mini USB, DC зарядки Специальные Особенности: светодиодный дисплей Тип изделия: сигнализация System and безопасности радарное Обнаружение расстояние: 300-800 м', '2017-12-07 15:20:10', '0000-00-00 00:00:00'),
(12, 13, 'Игровые наушники EACH G1000', '/build/items/each.png', 1000, 'римечание:есть USB разъем для питания СВЕТОДИОДНЫЕ фонари, и два аудио разъема для наушников и микрофона. зеленый разъем для наушников, и красный один для микрофона. наушники не работают на PS4, PS3, или Xbox 360, они совместимы только с компьютеров или ПК', '2017-12-07 15:21:17', '0000-00-00 00:00:00'),
(13, 14, 'Игровая мышь Fantech v2', '/build/items/fantech2.png', 550, 'Полнофункциональная производительность. 6 кнопок мышки предоставляют Вам полный контроль над игрой, а также Вашей музыкой во время игры. Зажмите кнопку DPI на 5 секунд и управляйте колесом прокрутки — Воспроизвести/Приостановить, Громкость громче/тише, Следующая/Предыдущая песня. Мгновенная смена DPI. Выделенная кнопка для смены режимов DPI “на лету”. Выбирайте подходящей режим: 800-1200-1600-2400 DPI. Высокий комфорт. Опытно разработанный дизайн, который предлагает компактную и симметрично разработанную форму, независимо от вашего хвата кистью. Долговечные кнопки. Высокотехнологичные кнопки Fantech имеют срок службы в 5 миллиона кликов и остаются быстро реагирующими все время. Максимальная персонализация. Настройте под себя цвет подсветки мыши для определения удобной для Вас режима DPI, каждый цвет соответствует определенному режиму DPI.', '2017-12-07 15:22:04', '0000-00-00 00:00:00'),
(14, 15, 'Игровая мышь A4tech v8m Blody', '/build/items/A4tech.png', 1500, 'На этого «грызуна» не просто приятно смотреть, его приятно держать в руке и использовать по назначению. Поставляется A4TechV8m в в красивой коробке фирменного Bloody-оформления, а в комплекте поставки, помимо самой мышки, найдётся карточка с адресом загрузки софта и 2 наклейки-стикера в виде кровавых следов ладони. Упаковка A4Tech Bloody V8m Упаковка A4Tech Bloody V8m Дизайн V8m агрессивный, под стать названию серии. Угловатые формы довольно широкой спинки мыши подсвечены красным, как и фирменный отпечаток. Сверху покрытие гладкое, но не глянцевое, а по бокам мышь прорезинена и снабжена «ребрышками». По столу мышь бегает на металлических ножках, приземистых и не царапающих поверхность. На официальном сайте можно приобрести комплектующие для мыши — например, сменные ножки можно с лёгкостью заказать, если старые совсем устанут в боях.', '2017-12-07 15:22:35', '0000-00-00 00:00:00'),
(15, 16, 'Спиннер', '/build/items/spinner.png', 200, 'Спиннеры, фиджет спиннеры, вертушки — игрушка-антистресс, состоящая из подшипника в центре и нескольких лепестков корпуса. Обчно удерживается большим и средним пальцами, а раскручивается небольшим щелчком.', '2017-12-07 15:33:22', '0000-00-00 00:00:00'),
(16, 17, 'USB Лампа', '/build/items/usb-vent.png', 150, '', '2017-12-07 15:35:22', '0000-00-00 00:00:00'),
(17, 18, 'Стерео наушники', '/build/items/nauwniki-sony.png', 150, '', '2017-12-07 15:36:17', '0000-00-00 00:00:00'),
(18, 19, 'Bluetooth колонка JBL', '/build/items/jbl.png', 1500, '', '2017-12-07 15:36:45', '0000-00-00 00:00:00'),
(19, 20, 'Гироскутер', '/build/items/giroskuter.png', 12000, '', '2017-12-07 15:37:12', '0000-00-00 00:00:00'),
(20, 21, 'Powerbank 8800 mah на выбор покемон или xiaomi', '/build/items/quwartz-watch.png', 550, '', '2017-12-07 15:38:32', '0000-00-00 00:00:00'),
(21, 22, 'Наушники Kingston HyperX Stinger', '/build/items/kingston-ushi.png', 3000, '', '2017-12-07 15:39:13', '0000-00-00 00:00:00'),
(22, 23, 'Blutooth колонка JBL Clip', '/build/items/blototh-kolonka.png', 1600, '', '2017-12-07 15:40:25', '0000-00-00 00:00:00'),
(23, 24, 'Bluetooth колонка Jbl Charge 3', '/build/items/jbl3.png', 3000, '', '2017-12-07 15:41:05', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `bonus_history`
--

CREATE TABLE IF NOT EXISTS `bonus_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `cardgames`
--

CREATE TABLE IF NOT EXISTS `cardgames` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bet` int(11) NOT NULL,
  `case` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `opened` int(11) NOT NULL,
  `items` varchar(2568) CHARACTER SET utf8 NOT NULL,
  `item_2` int(11) NOT NULL,
  `cards` varchar(512) NOT NULL,
  `garant` int(11) NOT NULL,
  `demo` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `cases`
--

CREATE TABLE IF NOT EXISTS `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(64) CHARACTER SET utf8 NOT NULL,
  `chance` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `cases`
--

INSERT INTO `cases` (`id`, `name`, `price`, `type`, `image`, `color`, `chance`, `created_at`, `updated_at`) VALUES
(1, 'Барахолка', 70, 'def', '/build/images/box_gray.png', 'gray', 12, '2017-12-07 14:30:33', '2017-12-07 19:30:33'),
(3, 'Девушкам', 80, '', '/build/images/box_roz.png', 'red', 19, '2017-12-05 13:40:13', '2017-12-05 18:40:13'),
(4, 'Гаджет', 350, '', '/build/images/box_green.png', 'green', 15, '2017-12-05 13:46:10', '2017-12-05 18:46:10'),
(5, 'Топ', 650, '', '/build/images/box_blue.png', 'blue', 25, '2017-12-05 19:01:56', '2017-12-05 19:01:56'),
(6, 'Автолюбитель', 200, '', '/build/images/box_purple.png', 'purple', 25, '2017-12-05 19:20:00', '2017-12-05 19:20:00'),
(7, 'Игровой', 900, '', '/build/images/box_red.png', 'red', 25, '2017-12-05 19:28:24', '2017-12-05 19:28:24'),
(8, 'Бесплатный', 0, '', '/build/images/box_white_blue.png', 'blue', 25, '2017-12-05 19:53:55', '2017-12-05 19:53:55');

-- --------------------------------------------------------

--
-- Структура таблицы `deliver`
--

CREATE TABLE IF NOT EXISTS `deliver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `item1` int(11) NOT NULL,
  `item2` int(11) NOT NULL,
  `item3` int(11) NOT NULL,
  `item4` int(11) NOT NULL,
  `item5` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `tracking` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'null',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Структура таблицы `delivery`
--

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `name` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `postalcode` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dom` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `kvartira` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `street` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` longtext CHARACTER SET utf8 NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `case` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `win_item` int(11) NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `history`
--

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `case` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL,
  `chance` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `case` int(11) NOT NULL,
  `in_shop` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=160 ;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `type`, `image`, `case`, `in_shop`, `created_at`, `updated_at`) VALUES
(2, 'Экшн камера', 2000, 1, '/build/items/go-pro.png', 1, 1, '2017-12-07 14:31:30', '2017-12-07 19:31:30'),
(3, 'Электронная сигарета KangerTech KBOX 120 W комплект', 1700, 0, '/build/items/naviforce.png', 1, 0, '2017-11-26 07:53:22', '0000-00-00 00:00:00'),
(4, 'Bluetooth колонка JBL clip', 1600, 0, '/build/items/blototh-kolonka.png', 1, 1, '2017-12-06 19:17:10', '2017-12-07 00:17:10'),
(5, 'Blutooth колонка JBL Charge 2', 1500, 0, '/build/items/jbl-1500.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(6, 'Powerbank 12 000 mAh  с солнечной панелью', 1000, 0, '/build/items/powerbank10mph.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(7, 'Часы G-SHOCK ', 1000, 0, '/build/items/gshock.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(8, 'Blutooth колонка led', 550, 0, '/build/items/blototh-kolonka-green.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(9, 'Bluetooth-гарнитура с handsfree', 500, 0, '/build/items/Bluetooth-garn.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(10, 'Powerbank Totoro II 8800 mАh', 500, 0, '/build/items/totoro.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(11, 'Powerbank 8800 mah на выбор покемон или xiaomi', 450, 0, '/build/items/quwartz-watch.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(12, 'Наушники SONY Extra Bass', 400, 0, '/build/items/usb-flash-stars-wars.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(13, 'Стерео наушники Clear sound', 300, 0, '/build/items/noj-keramika.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(14, 'Стерео наушники для iphone', 300, 0, '/build/items/garn-stereo-iphone.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(15, 'MP3 плеер с дисплеем', 200, 0, '/build/items/mp3-pleer.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(16, 'Мp3 плеер', 150, 0, '/build/items/mp3-pleerr.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(17, 'Usb кабель для iphone', 130, 0, '/build/items/kabel-iphone.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(18, 'Стерео гарнитура JBL', 110, 0, '/build/items/bl_treker.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(19, 'Сэлфи палка (монопод)', 110, 0, '/build/items/selfi-palka.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(20, 'Стерео наушники', 80, 0, '/build/items/nauwniki-sony.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(21, 'Двойное USB Зарядное Устройство ', 80, 0, '/build/items/derjatel.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(22, 'Спиннер', 80, 0, '/build/items/spinner.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(23, 'Алюминиевый фонарик ', 75, 0, '/build/items/fonarik.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(24, 'Объектив для смартфона', 70, 0, '/build/items/4ehol.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(25, 'Петличный микрофон', 70, 0, '/build/items/micro.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(26, 'Нож карточка', 70, 0, '/build/items/noj.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(27, 'Лазерная указка', 70, 0, '/build/items/laser.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(28, 'USB лампа', 60, 0, '/build/items/usb-vent.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(29, 'Наушники Monster Beats', 60, 0, '/build/items/luxe-4ehol.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(30, 'Спорт часы', 60, 0, '/build/items/sport-watch.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(31, 'USB Картридер все в 1', 50, 0, '/build/items/shnurki-led.png', 1, 0, '2017-11-26 08:05:50', '0000-00-00 00:00:00'),
(32, 'Apple iPhone 6S 16Gb Rose', 30000, 1, '/build/items/iphone6s-rose.png', 3, 0, '2017-12-05 13:01:34', '2017-12-05 13:17:44'),
(33, 'Стайлер-плойка Babyliss Perfect Curl ', 2000, 1, '/build/items/BaByliss%20Perfect.png', 3, 1, '2017-12-05 13:01:44', '2017-12-05 13:20:37'),
(34, 'Электрическая пилка для ногтей Scholl Velvet Smooth', 1200, 0, '/build/items/Scholl-Velvet-Smooth.png', 3, 1, '2017-12-05 17:50:20', '2017-12-05 17:50:20'),
(35, 'Наушники MP3 C Bluetooth Beats', 1000, 0, '/build/items/beats-bt.png', 3, 0, '2017-12-05 17:53:31', '2017-12-05 17:53:31'),
(36, 'Весы напольные электронные', 900, 0, '/build/items/vesi.png', 3, 0, '2017-12-05 18:00:58', '2017-12-05 18:00:58'),
(37, 'Наушники с гарнитурой "JKR"', 850, 0, '/build/items/jkr.png', 3, 0, '2017-12-05 18:03:01', '2017-12-05 18:03:01'),
(38, 'Эпилятор-триммер SURKER', 800, 0, '/build/items/veet-trimmer.png', 3, 0, '2017-12-05 18:03:41', '2017-12-05 18:03:41'),
(39, 'Диско шар Magic Ball Light MP3 с флешкой и пультом (цветомузыка) ', 800, 0, '/build/items/disko-shar.png', 3, 0, '2017-12-05 18:05:11', '2017-12-05 18:05:11'),
(40, 'Прибор для ухода за ногами Scholl Velvet Smooth', 800, 0, '/build/items/ss.png', 3, 0, '2017-12-05 18:06:03', '2017-12-05 18:06:03'),
(41, 'Складной фен для укладки волос "Atlanfa" ', 700, 0, '/build/items/atlanfa.png', 3, 0, '2017-12-05 18:06:49', '2017-12-05 18:06:49'),
(42, 'Мини-плойка "SHINON" ', 650, 0, '/build/items/shinon.png', 3, 0, '2017-12-05 18:07:33', '2017-12-05 18:07:33'),
(43, 'VEET Триммер женский ', 600, 0, '/build/items/veet-trimmer.png', 3, 0, '2017-12-05 18:08:56', '2017-12-05 18:08:56'),
(44, 'Станок для бритья Gillette Venus, (1+1)', 600, 0, '/build/items/Gillette%20Venus.png', 3, 0, '2017-12-05 18:09:30', '2017-12-05 18:09:30'),
(45, 'Power Bank совы 8800mAh', 500, 0, '/build/items/sovi.png', 3, 0, '2017-12-05 18:10:05', '2017-12-05 18:10:05'),
(46, 'Стельки Scholl женские ', 500, 0, '/build/items/Scholl-GelActiv.png', 3, 0, '2017-12-05 18:10:38', '2017-12-05 18:10:38'),
(47, 'Электрическая расческа-выпрямитель Fast Hair Straightener ', 450, 0, '/build/items/el-ras4eska.png', 3, 0, '2017-12-05 18:12:55', '2017-12-05 18:12:55'),
(48, 'Распрямитель для волос"BORAN"', 400, 0, '/build/items/boran.png', 3, 0, '2017-12-05 18:13:56', '2017-12-05 18:13:56'),
(49, 'Будильник "Миньон" ', 360, 0, '/build/items/minion.png', 3, 0, '2017-12-05 18:14:16', '2017-12-05 18:14:16'),
(50, 'USB флешка "SONY VAIO" 4GB USB 2.0', 350, 0, '/build/items/sonyflash.png', 3, 0, '2017-12-05 18:15:01', '2017-12-05 18:15:01'),
(51, 'Монопод сэлфи c Bluetooth для IOS и Android', 300, 0, '/build/items/selfie-bt.png', 3, 0, '2017-12-05 18:16:03', '2017-12-05 18:16:03'),
(52, 'Колонка c Bluetooth', 300, 0, '/build/items/bt-kolonka.png', 3, 0, '2017-12-05 18:16:56', '2017-12-05 18:16:56'),
(53, 'Часы женские с узким ремешком', 220, 0, '/build/items/watch-male.png', 3, 0, '2017-12-05 18:17:41', '2017-12-05 18:17:41'),
(54, 'Наушники с гарнитурой "SAMSUNG"', 200, 0, '/build/items/samsung-garnityra.png', 3, 0, '2017-12-05 18:18:17', '2017-12-05 18:18:17'),
(55, 'Ночник "Облако"', 120, 0, '/build/items/no4nik.png', 3, 0, '2017-12-05 18:18:52', '2017-12-05 18:18:52'),
(56, 'Зажигалка "Помада"', 90, 0, '/build/items/zagigalka.png', 3, 0, '2017-12-05 18:19:59', '2017-12-05 18:19:59'),
(57, 'Вибро массажер', 80, 0, '/build/items/massager.png', 3, 0, '2017-12-05 18:20:32', '2017-12-05 18:20:32'),
(58, 'Зарядное устройство Адаптер 2 USB', 75, 0, '/build/items/2-usb.png', 3, 0, '2017-12-05 18:21:07', '2017-12-05 18:21:07'),
(59, 'Моя бутылка "MY BOTTLE"', 75, 0, '/build/items/my-bottle.png', 3, 0, '2017-12-05 18:21:29', '2017-12-05 18:21:29'),
(60, 'Стерео Наушники Металлические', 70, 0, '/build/items/nayshniki-rose.png', 3, 0, '2017-12-05 18:21:58', '2017-12-05 18:21:58'),
(61, 'Термометр оконный "Божья Коровка"', 70, 0, '/build/items/termometr.png', 3, 0, '2017-12-05 18:22:29', '2017-12-05 18:22:29'),
(62, 'Наушники Monster Beats (Красные)', 60, 0, '/build/items/beats.png', 3, 0, '2017-12-05 18:22:58', '2017-12-05 18:22:58'),
(63, 'Спортивные часы', 60, 0, '/build/items/sport-watch-rose.png', 3, 0, '2017-12-05 18:23:19', '2017-12-05 18:23:19'),
(64, 'Iphone 5S', 15000, 1, '/build/items/iphone5s.png', 4, 1, '2017-12-06 19:17:35', '2017-12-07 00:17:35'),
(65, 'Гироскутер', 10000, 1, '/build/items/giroskuter.png', 4, 0, '2017-12-05 18:46:59', '2017-12-05 18:46:59'),
(66, 'Игровая мышь Mad Catz', 5000, 1, '/build/items/madcatz.png', 4, 0, '2017-12-05 18:47:20', '2017-12-05 18:47:20'),
(67, 'Внешний жесткий диск на 1 тб', 3500, 1, '/build/items/hdd-1tb.png', 4, 0, '2017-12-05 18:47:43', '2017-12-05 18:47:43'),
(68, 'Kanger Starter Kit Box Vape Мод', 3000, 1, '/build/items/kangertech.png', 4, 0, '2017-12-05 18:48:09', '2017-12-05 18:48:09'),
(69, 'Наушники Kingston HyperX Stinge', 3000, 0, '/build/items/kingston-ushi.png', 4, 0, '2017-12-05 18:48:33', '2017-12-05 18:48:33'),
(70, 'Bluetooth колонка JBL', 1500, 0, '/build/items/jbl.png', 4, 0, '2017-12-05 18:48:58', '2017-12-05 18:48:58'),
(71, 'Игровые наушники Owan X-7', 1200, 0, '/build/items/owan.png', 4, 0, '2017-12-05 18:49:21', '2017-12-05 18:49:21'),
(72, 'Игровые наушники NoSwer', 1000, 0, '/build/items/noswer.png', 4, 0, '2017-12-05 18:49:41', '2017-12-05 18:49:41'),
(73, 'Bluetooth-гарнитура с handsfree', 500, 0, '/build/items/Bluetooth-garn.png', 4, 0, '2017-12-05 18:50:03', '2017-12-05 18:50:03'),
(74, 'IWO Спинер LED', 500, 0, '/build/items/iwo-spiner.png', 4, 0, '2017-12-05 18:50:30', '2017-12-05 18:50:30'),
(75, 'Объектив для смартфона', 500, 0, '/build/items/obektiv.png', 4, 0, '2017-12-05 18:50:54', '2017-12-05 18:50:54'),
(76, 'Powerbank Totoro II 8800 mАh', 500, 0, '/build/items/totoro.png', 4, 0, '2017-12-05 18:51:18', '2017-12-05 18:51:18'),
(77, 'Powerbank 8800 mah на выбор покемон или xiaomi', 450, 0, '/build/items/quwartz-watch.png', 4, 0, '2017-12-05 18:52:30', '2017-12-05 18:52:30'),
(78, 'Blutooth колонка led', 450, 0, '/build/items/blototh-kolonka-green.png', 4, 0, '2017-12-05 18:52:52', '2017-12-05 18:52:52'),
(79, 'Карманный монокль', 400, 0, '/build/items/monokl.png', 4, 0, '2017-12-05 18:53:18', '2017-12-05 18:53:18'),
(80, 'Наушники SONY Extra Bass', 400, 0, '/build/items/usb-flash-stars-wars.png', 4, 0, '2017-12-05 18:53:42', '2017-12-05 18:53:42'),
(81, 'Электронная сигарета Evod mt3', 380, 0, '/build/items/evod.png', 4, 0, '2017-12-05 18:54:02', '2017-12-05 18:54:02'),
(82, 'Стерео наушники Clear sound', 300, 0, '/build/items/noj-keramika.png', 4, 0, '2017-12-05 18:54:23', '2017-12-05 18:54:23'),
(83, 'Стерео наушники для iphone', 300, 0, '/build/items/garn-stereo-iphone.png', 4, 0, '2017-12-05 18:54:44', '2017-12-05 18:54:44'),
(84, 'Стерео гарнитура JBL', 150, 0, '/build/items/bl_treker.png', 4, 0, '2017-12-05 18:55:04', '2017-12-05 18:55:04'),
(85, 'Спинер', 110, 0, '/build/items/spinner.png', 4, 0, '2017-12-05 18:55:21', '2017-12-05 18:55:21'),
(86, 'Apple iPhone 6S 16Gb ', 30000, 1, '/build/items/iphone6s.png', 5, 1, '2017-12-06 19:19:00', '2017-12-07 00:19:00'),
(87, 'Планшет samsung Tab A 10', 20000, 1, '/build/items/planshet.png', 5, 0, '2017-12-05 19:04:01', '2017-12-05 19:04:01'),
(88, 'Диск Kingston SSD 120 ГБ', 4000, 1, '/build/items/ssd-kingston.png', 5, 0, '2017-12-05 19:04:21', '2017-12-05 19:04:21'),
(89, 'Смарт часы', 3800, 1, '/build/items/smart-watch.png', 5, 0, '2017-12-05 19:04:40', '2017-12-05 19:04:40'),
(90, 'Bluetooth колонка Jbl Charge 3', 3000, 1, '/build/items/jbl3.png', 5, 0, '2017-12-05 19:05:06', '2017-12-05 19:05:06'),
(91, 'Kanger Starter Kit Box Vape Мод', 2950, 0, '/build/items/kangertech.png', 5, 0, '2017-12-05 19:07:21', '2017-12-05 19:07:21'),
(92, 'Экшн камера', 2000, 0, '/build/items/go-pro.png', 5, 0, '2017-12-05 19:07:42', '2017-12-05 19:07:42'),
(93, 'Blutooth колонка JBL Clip', 1600, 0, '/build/items/blototh-kolonka.png', 5, 0, '2017-12-05 19:12:44', '2017-12-05 19:12:44'),
(94, 'Электронная сигарета Jomo Lite 40w', 1600, 0, '/build/items/jomo.png', 5, 0, '2017-12-05 19:13:08', '2017-12-05 19:13:08'),
(95, 'Powerbank 20 000 mAh с солнечными батареями', 1000, 0, '/build/items/powerbank10mph.png', 5, 0, '2017-12-05 19:13:35', '2017-12-05 19:13:35'),
(96, 'mp3 плеер RuiZu X02 HiFi', 900, 0, '/build/items/mp3-pleer3.png', 5, 0, '2017-12-05 19:14:00', '2017-12-05 19:14:00'),
(97, 'Электронная сигарета Joyetech eGo Aio', 900, 0, '/build/items/vape-ego.png', 5, 0, '2017-12-05 19:14:42', '2017-12-05 19:14:42'),
(98, 'Powerbank 12 000 mAh ', 850, 0, '/build/items/powerbank12000mph.png', 5, 0, '2017-12-05 19:15:10', '2017-12-05 19:15:10'),
(99, 'Спортивные часы', 700, 0, '/build/items/sport-watch-2.png', 5, 0, '2017-12-05 19:15:27', '2017-12-05 19:15:27'),
(100, 'Bluetooth-гарнитура с handsfree', 500, 0, '/build/items/Bluetooth-garn.png', 5, 0, '2017-12-05 19:15:54', '2017-12-05 19:15:54'),
(101, 'Объектив для смартфона', 500, 0, '/build/items/obektiv.png', 5, 0, '2017-12-05 19:16:11', '2017-12-05 19:16:11'),
(102, 'Наушники SONY Extra Bass', 400, 0, '/build/items/usb-flash-stars-wars.png', 5, 0, '2017-12-05 19:16:33', '2017-12-05 19:16:33'),
(103, 'Карманный монокль ', 400, 0, '/build/items/monokl.png', 5, 0, '2017-12-05 19:16:58', '2017-12-05 19:16:58'),
(104, 'Стерео наушники для iphone', 300, 0, '/build/items/garn-stereo-iphone.png', 5, 0, '2017-12-05 19:17:28', '2017-12-05 19:17:28'),
(105, 'GPS навигатор', 3500, 1, '/build/items/navitel.png', 6, 0, '2017-12-05 19:21:09', '2017-12-05 19:21:09'),
(106, 'Регистратор зеркало заднего вида', 2400, 1, '/build/items/zerkalo-registrator.png', 6, 0, '2017-12-05 19:21:29', '2017-12-05 19:21:29'),
(107, 'Радар детектор «анти стрелка»', 2200, 1, '/build/items/radar-detektor.png', 6, 0, '2017-12-05 19:22:01', '2017-12-05 19:22:01'),
(108, 'Автомобильный регистратор ультра тонкий', 1500, 1, '/build/items/registrator.png', 6, 0, '2017-12-05 19:22:33', '2017-12-05 19:22:33'),
(109, 'Fm Трансмиттер', 600, 0, '/build/items/fm.png', 6, 0, '2017-12-05 19:22:57', '2017-12-05 19:22:57'),
(110, 'Набор отверток', 500, 0, '/build/items/nabor-otvertok.png', 6, 0, '2017-12-05 19:23:14', '2017-12-05 19:23:14'),
(111, 'Автомобильное зарядное устройство ', 350, 0, '/build/items/zaryadnoe-usb.png', 6, 0, '2017-12-05 19:23:34', '2017-12-05 19:23:34'),
(112, 'Универсальный автомобильный держатель телефона ', 200, 0, '/build/items/derjatel_telefona.png', 6, 0, '2017-12-05 19:23:55', '2017-12-05 19:23:55'),
(113, 'Держатель магнитный ', 90, 0, '/build/items/derjatel_magnit.png', 6, 0, '2017-12-05 19:24:16', '2017-12-05 19:24:16'),
(114, 'Не скользящий коврик ', 80, 0, '/build/items/kovrik.png', 6, 0, '2017-12-05 19:24:33', '2017-12-05 19:24:33'),
(115, 'USB Прикуриватель', 60, 0, '/build/items/usb-prikurivatel.png', 6, 0, '2017-12-05 19:24:56', '2017-12-05 19:24:56'),
(116, 'nvidia geforce gtx 1050 ti 4 ГБ', 10000, 1, '/build/items/nvidia-gtx1050.png', 7, 0, '2017-12-05 19:28:54', '2017-12-05 19:28:54'),
(117, 'Игровые Наушники Kingston HyperX Револьвер', 8000, 1, '/build/items/kingsron-hyperx.png', 7, 0, '2017-12-05 19:29:16', '2017-12-05 19:29:16'),
(118, 'Игровая механическая клавиатура Havit', 5000, 1, '/build/items/kl-havit.png', 7, 0, '2017-12-05 19:29:46', '2017-12-05 19:29:46'),
(119, 'игровая мышь Logitech G502 Proteus', 4200, 1, '/build/items/LogitechG502.png', 7, 0, '2017-12-05 19:31:48', '2017-12-05 19:31:48'),
(120, 'Игровая механическая клавиатура K729', 3600, 1, '/build/items/e-3lue.png', 7, 0, '2017-12-05 19:32:11', '2017-12-05 19:32:11'),
(121, 'Набор геймера клавиатура + мышь ', 3000, 1, '/build/items/naborkl+mouse.png', 7, 0, '2017-12-05 19:32:29', '2017-12-05 19:32:29'),
(122, 'Игровая механическая клавиатура Motospeed CK104', 2900, 1, '/build/items/renault.png', 7, 0, '2017-12-05 19:33:14', '2017-12-05 19:33:14'),
(123, 'Игровые Наушники Steelseries Siberia V2 ', 2000, 0, '/build/items/steel-series-siberiav2.png', 7, 0, '2017-12-05 19:33:38', '2017-12-05 19:33:38'),
(124, 'Star Wars Радио управляемый робот ', 1700, 0, '/build/items/robot-stars-wars.png', 7, 0, '2017-12-05 19:33:59', '2017-12-05 19:33:59'),
(125, 'Геймпад для xbox one ', 1600, 0, '/build/items/game-pad-xbox.png', 7, 0, '2017-12-05 19:34:49', '2017-12-05 19:34:49'),
(126, 'Игровая мышь A4tech v8m Blody', 1500, 0, '/build/items/A4tech.png', 7, 0, '2017-12-05 19:35:16', '2017-12-05 19:35:16'),
(127, 'Большой коврик racoon ', 1200, 0, '/build/items/kovrik-big.png', 7, 0, '2017-12-05 19:35:36', '2017-12-05 19:35:36'),
(128, 'Игровая мышь TeckNet Pro', 1000, 0, '/build/items/Tecknet.png', 7, 0, '2017-12-05 19:35:56', '2017-12-05 19:35:56'),
(129, 'Игровые наушники EACH G1000', 1000, 0, '/build/items/each.png', 7, 0, '2017-12-05 19:36:21', '2017-12-05 19:36:21'),
(130, 'Игровая клавиаутра Smartbuy rush', 1000, 0, '/build/items/smart.png', 7, 0, '2017-12-05 19:36:42', '2017-12-05 19:36:42'),
(131, 'Коврик с подсветкой ', 800, 0, '/build/items/kovrik-led.png', 7, 0, '2017-12-05 19:36:58', '2017-12-05 19:36:58'),
(132, 'Игровая Мышь zuoya ', 800, 0, '/build/items/zuhoya.png', 7, 0, '2017-12-05 19:37:17', '2017-12-05 19:37:17'),
(133, 'Внешняя звуковая карта ', 700, 0, '/build/items/ugreen.png', 7, 0, '2017-12-05 19:37:38', '2017-12-05 19:37:38'),
(134, 'Игровые Наушники Cosonic USB', 700, 0, '/build/items/Cosonic.png', 7, 0, '2017-12-05 19:37:55', '2017-12-05 19:37:55'),
(135, 'Game Pad USB PC', 700, 0, '/build/items/game-pad-pc.png', 7, 0, '2017-12-05 19:38:26', '2017-12-05 19:38:26'),
(136, 'Игровая мышь rajfo', 600, 0, '/build/items/rajfo.png', 7, 0, '2017-12-05 19:38:47', '2017-12-05 19:38:47'),
(137, 'Игровая мышь x-8', 500, 0, '/build/items/x-8.png', 7, 0, '2017-12-05 19:39:06', '2017-12-05 19:39:06'),
(138, 'Игровая мышь 3200 dpi USB', 500, 0, '/build/items/gamin-mouse-3200dpi.png', 7, 0, '2017-12-05 19:39:30', '2017-12-05 19:39:30'),
(139, 'Игровая Fantech v2', 500, 0, '/build/items/fantech2.png', 7, 0, '2017-12-05 19:39:50', '2017-12-05 19:39:50'),
(140, 'Apple iPhone 6S 16Gb ', 30000, 1, '/build/items/iphone6s.png', 8, 0, '2017-12-05 20:08:10', '2017-12-05 20:08:10'),
(141, 'Планшет samsung Tab A 10', 20000, 1, '/build/items/planshet.png', 8, 0, '2017-12-05 20:09:23', '2017-12-05 20:09:23'),
(142, 'Iphone 5S', 17000, 1, '/build/items/iphone5s.png', 8, 0, '2017-12-05 20:09:50', '2017-12-05 20:09:50'),
(143, 'Гироскутер', 13000, 1, '/build/items/giroskuter.png', 8, 0, '2017-12-05 20:10:07', '2017-12-05 20:10:07'),
(144, 'Смартфон Lenovo Vibe S1, 13 мп 32 гб', 12000, 1, '/build/items/Blackview%20A8%20IPS%204G.png', 8, 0, '2017-12-05 15:12:57', '2017-12-05 20:11:54'),
(145, 'Powerbank 8800 mah на выбор покемон или xiaomi', 450, 0, '/build/items/quwartz-watch.png', 8, 0, '2017-12-05 20:13:26', '2017-12-05 20:13:26'),
(146, 'Наушники SONY Extra Bass', 400, 0, '/build/items/usb-flash-stars-wars.png', 8, 0, '2017-12-05 20:13:47', '2017-12-05 20:13:47'),
(147, 'Стерео наушники Clear sound', 250, 0, '/build/items/noj-keramika.png', 8, 0, '2017-12-05 20:14:06', '2017-12-05 20:14:06'),
(148, 'Мp3 плеер', 150, 0, '/build/items/mp3-pleerr.png', 8, 0, '2017-12-05 20:14:26', '2017-12-05 20:14:26'),
(149, 'Сэлфи палка (монопод) ', 110, 0, '/build/items/selfi-palka.png', 8, 0, '2017-12-05 20:14:48', '2017-12-05 20:14:48'),
(150, 'Спорт часы', 100, 0, '/build/items/sport-watch.png', 8, 0, '2017-12-05 20:15:06', '2017-12-05 20:15:06'),
(151, 'Алюминиевый фонарик ', 75, 0, '/build/items/fonarik.png', 8, 0, '2017-12-05 20:15:37', '2017-12-05 20:15:37'),
(152, 'Объектив для смартфона', 70, 0, '/build/items/4ehol.png', 8, 0, '2017-12-05 20:16:06', '2017-12-05 20:16:06'),
(153, 'Стерео наушники', 70, 0, '/build/items/nauwniki-sony.png', 8, 0, '2017-12-05 20:16:27', '2017-12-05 20:16:27'),
(154, 'Нож карточка', 70, 0, '/build/items/noj.png', 8, 0, '2017-12-05 20:16:46', '2017-12-05 20:16:46'),
(155, 'Лазерная указка', 70, 0, '/build/items/laser.png', 8, 0, '2017-12-05 20:17:09', '2017-12-05 20:17:09'),
(156, 'Наушники Monster Beats ', 60, 0, '/build/items/luxe-4ehol.png', 8, 0, '2017-12-05 20:17:24', '2017-12-05 20:17:24'),
(157, 'USB лампа', 60, 0, '/build/items/usb-vent.png', 8, 0, '2017-12-05 20:17:41', '2017-12-05 20:17:41'),
(158, 'Не скользящий коврик ', 60, 0, '/build/items/kovrik.png', 8, 0, '2017-12-05 20:17:57', '2017-12-05 20:17:57'),
(159, 'Смартфон Lenovo Vibe S1, 13 мп 32 гб', 12000, 1, '/build/items/Blackview%20A8%20IPS%204G.png', 1, 0, '2017-12-07 19:31:16', '2017-12-07 19:31:16');

-- --------------------------------------------------------

--
-- Структура таблицы `opinions`
--

CREATE TABLE IF NOT EXISTS `opinions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` text CHARACTER SET utf8 NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `ref` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `promocodes`
--

CREATE TABLE IF NOT EXISTS `promocodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(256) CHARACTER SET utf8 NOT NULL,
  `price` int(11) NOT NULL,
  `activation_count` int(11) NOT NULL,
  `activated` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `promo_history`
--

CREATE TABLE IF NOT EXISTS `promo_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `code` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `group_link` varchar(64) CHARACTER SET utf8 NOT NULL,
  `ref_sum` int(11) NOT NULL,
  `ref_percent` int(11) NOT NULL,
  `min_pay` int(11) NOT NULL,
  `fk_id` int(11) NOT NULL,
  `fk_secret1` varchar(10) NOT NULL,
  `fk_secret2` varchar(10) NOT NULL,
  `free_case` int(11) NOT NULL,
  `d_price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `settings`
--

INSERT INTO `settings` (`id`, `group_id`, `group_link`, `ref_sum`, `ref_percent`, `min_pay`, `fk_id`, `fk_secret1`, `fk_secret2`, `free_case`, `d_price`, `created_at`, `updated_at`) VALUES
(1, 0, '', 50, 5, 0, 0, '', '', 300, 300, '2017-12-07 17:26:33', '2017-12-06 18:34:38');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `avatar` varchar(256) NOT NULL,
  `money` int(255) NOT NULL,
  `login` varchar(256) NOT NULL,
  `login2` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_admin` int(11) NOT NULL,
  `is_yt` int(11) NOT NULL,
  `ref_code` varchar(256) NOT NULL,
  `ref_use` varchar(256) DEFAULT NULL,
  `nick` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bonus_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '2016-11-08 19:43:23',
  `free_cases_left` int(11) DEFAULT '0',
  `remember_token` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '2016-11-08 21:32:40',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
