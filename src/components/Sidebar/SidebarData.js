// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
	{
		title: "Inicio",
		path: "/",
		icon: <IoIcons.IoIosHome />,
	},
	{
		title: "Perfil",
		path: "#",
		icon: <AiIcons.AiFillHome />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "MI PERFIL",
				path: "/verperfil",
				icon: <IoIcons.IoIosPaper />,
			}/*,
			{
				title: "Our Vision",
				path: "/about-us/vision",
				icon: <IoIcons.IoIosPaper />,
			},*/
		],
	},
	{
		title: "Services",
		path: "#",
		icon: <IoIcons.IoIosPaper />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Service 1",
				path: "/services/services1",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Service 2",
				path: "/services/services2",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Service 3",
				path: "/services/services3",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Contact",
		path: "/contact",
		icon: <FaIcons.FaPhone />,
	},
	{
		title: "Events",
		path: "#",
		icon: <FaIcons.FaEnvelopeOpenText />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Event 1",
				path: "/events/events1",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Event 2",
				path: "/events/events2",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Support",
		path: "/support",
		icon: <IoIcons.IoMdHelpCircle />,
	},
];
