import { defineStore } from 'pinia'

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuList: [
      {
        name: "home",
        to: "/",
      },
      {
        name: "shop",
        to: "/shop",
      },
      {
        name: "favorites",
        to: "/favorites",
        submenu: [
          {
            name: "test_1",
            to: "/favorites"
          },
          {
            name: "test_2",
            to: "/favorites"
          },
          {
            name: "test_3",
            to: "/favorites"
          },
        ]
      },
      {
        name: "strollers",
        to: "/strollers",
      },
      {
        name: "clothes",
        to: "/clothes",
      },
      {
        name: "feeding",
        to: "/feeding",
        submenu: [
          {
            name: "test_1",
            to: "/feeding"
          },
          {
            name: "test_2",
            to: "/feeding"
          },
          {
            name: "test_3",
            to: "/feeding"
          },
        ]
      },
      {
        name: "nursing",
        to: "/nursing",
      },
    ],
  }),
});
