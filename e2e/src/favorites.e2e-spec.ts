import { FavoritesPage } from './favorites.po';

describe('favorites page', () => {
  beforeEach(() => {
    this.favoritesPage = new FavoritesPage();
    this.favoritesPage.get();
  });

  it('should add stories to the favorites', () => {
    const title = this.favoritesPage.addToFavorite();
    if (!title) {
      fail('No stories can be added.');
    }
    this.favoritesPage.isInFavorites(title);
  });
});
