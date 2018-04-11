import { TestBed, inject } from '@angular/core/testing';

import { ArchivosjugadoresService } from './archivosjugadores.service';

describe('ArchivosjugadoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivosjugadoresService]
    });
  });

  it('should be created', inject([ArchivosjugadoresService], (service: ArchivosjugadoresService) => {
    expect(service).toBeTruthy();
  }));
});


