import { TopStoriesPage } from './top-stories.po';

describe('top stories page', () => {
  beforeEach(() => {
    this.topStoriesPage = new TopStoriesPage();
    this.topStoriesPage.get();
  });

  it('should show 20 stories', () => {
    expect(this.topStoriesPage.getStoriesCount()).toEqual(20);
  });

  it('should show more stories when scrolling down', () => {
    expect(this.topStoriesPage.getStoriesCount()).toEqual(20);

    this.topStoriesPage.scrollDown();
    expect(this.topStoriesPage.getStoriesCount()).toEqual(40);
  });
});

