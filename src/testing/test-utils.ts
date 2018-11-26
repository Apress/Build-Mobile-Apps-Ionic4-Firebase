import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

export class TestUtils {
  static beforeEachCompiler(components: Array<any>, providers: Array<any> = []): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components, providers)
      .compileComponents().then(() => {
        const fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture,
          instance: fixture.componentInstance,
        };
      });
  }

  static configureIonicTestingModule(components: Array<any>, providers: Array<any> = []): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ...providers,
      ],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
    });
  }
}
