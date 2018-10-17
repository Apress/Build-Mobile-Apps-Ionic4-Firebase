import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoriesComponent } from './top-stories.component';
import { ItemService } from '../services/item/item.service';
import { ItemServiceMock } from '../services/item/item.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;

xdescribe('TopStoriesComponent', () => {
  let component: TopStoriesComponent;
  let fixture: ComponentFixture<TopStoriesComponent>;

  beforeEach(async(() => {
    const loadingStub = Promise.resolve({
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      dismiss: jasmine.createSpy('dismiss').and.returnValue(Promise.resolve()),
    });
    const loadingControllerStub = {
      create: jasmine.createSpy('loading').and.returnValue(loadingStub),
    };
    const toastStub = Promise.resolve({
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      dismiss: jasmine.createSpy('dismiss').and.returnValue(Promise.resolve()),
    });
    const toastControllerStub = {
      create: jasmine.createSpy('toast').and.returnValue(toastStub),
    };

    return TestBed.configureTestingModule({
      declarations: [TopStoriesComponent],
      providers: [
        {provide: ItemService, useClass: ItemServiceMock},
        {provide: LoadingController, useValue: loadingControllerStub},
        {provide: ToastController, useValue: toastControllerStub},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct title', () => {
    expect(component).toBeTruthy();
    const title = fixture.debugElement.query(By.css('ion-title')).nativeElement.textContent;
    expect(title).toEqual('Top Stories');
  });

  it('should display a list of 10 items', (done: DoneFn) => {

  });

  it('should show more items when scrolling down', (done: DoneFn) => {

  });
});
