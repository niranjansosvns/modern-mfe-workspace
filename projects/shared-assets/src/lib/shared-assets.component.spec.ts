import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAssetsComponent } from './shared-assets.component';

describe('SharedAssetsComponent', () => {
  let component: SharedAssetsComponent;
  let fixture: ComponentFixture<SharedAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
