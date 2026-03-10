/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { SnackbarService } from './snackbar.service';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { SnackbarType } from '@core/_models/snackbar/snackbar.model';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackbarMock: any;
  let translateServiceMock: any;

  beforeEach(() => {
    snackbarMock = {
      openFromComponent: vi.fn()
    };

    translateServiceMock = {
      instant: vi.fn().mockImplementation((key: string) => `${key}_TRANSLATED`)
    };

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: snackbarMock },
        { provide: TranslateService, useValue: translateServiceMock }
      ]
    });

    service = TestBed.inject(SnackbarService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showNotification Configuration Branches', () => {

    it('should configure correctly for "logIn-logOut" type and pass translation params', () => {
      // --- ARRANGE ---
      const messageKey = 'UI.SNACKBAR.LOGIN_SUCCESS';
      const type: SnackbarType = 'logIn-logOut';
      const params = { name: 'Admin' };

      // --- ACT ---
      service.showNotification(messageKey, type, params);

      // --- ASSERT ---
      expect(translateServiceMock.instant).toHaveBeenCalledWith(messageKey, params);

      expect(snackbarMock.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        panelClass: ['snackbar-container--logIn-logOut'],
        data: { message: `${messageKey}_TRANSLATED`, type: 'logIn-logOut' },
        duration: 7000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        politeness: 'polite'
      });
    });

    it.each([
      ['register'],
      ['orange-alert'],
      ['red-alert']
    ] as [SnackbarType][])('should configure correctly for assertive types: %s', (type) => {
      // --- ARRANGE ---
      const messageKey = 'UI.SNACKBAR.TEST';

      // --- ACT ---
      service.showNotification(messageKey, type);

      // --- ASSERT ---
      expect(translateServiceMock.instant).toHaveBeenCalledWith(messageKey, undefined);
      expect(snackbarMock.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        panelClass: [`snackbar-container--${type}`],
        data: { message: `${messageKey}_TRANSLATED`, type },
        duration: 7000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        politeness: 'assertive'
      });
    });

    it.each([
      ['created'],
      ['modified'],
      ['deleted'],
      ['unknown_default' as any]
    ] as [SnackbarType][])('should configure correctly for default/polite types: %s', (type) => {
      // --- ARRANGE ---
      const messageKey = 'UI.SNACKBAR.TEST';

      // --- ACT ---
      service.showNotification(messageKey, type);

      // --- ASSERT ---
      expect(snackbarMock.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        panelClass: [`snackbar-container--${type}`],
        data: { message: `${messageKey}_TRANSLATED`, type },
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'start',
        politeness: 'polite'
      });
    });
  });
});
