import Button from "@components/ui/Button/ButtonIndex.vue";
import SlideOver from "@components/ui/SlideOver/SlideOver.vue";
import Pagination from "@components/ui/Pagination/Pagination.vue";
import PopUp from "@components/ui/Popup/Popup.vue";
import BannerCard from "@components/ui/Card/BannerCard.vue";
import FavoriteIcon from "@components/ui/FavoriteButton.vue";

export const registerUIComponents = (Vue) => {
  Vue.component("ui-button", Button);
  Vue.component("ui-slide-over", SlideOver);
  Vue.component("ui-pagination", Pagination);
  Vue.component("ui-popup", PopUp);
  Vue.component("ui-banner-card", BannerCard);
  Vue.component("ui-favorite-icon", FavoriteIcon);
};
