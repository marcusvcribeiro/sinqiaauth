import { TestBed } from '@angular/core/testing';
import { NavbarFullService } from './navbar-full.service';
import { NavbarFullItem } from './navbar-full';

describe('NavbarFullService', () => {
  let service: NavbarFullService;
  let mock: NavbarFullItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarFullService],
    });

    service = TestBed.inject(NavbarFullService);

    mock = [
      {
        id: '1',
        name: 'Test 1',
        children: [
          {
            id: '1-1',
            name: 'Test 1-1',
            children: [
              {
                id: '1-1-1',
                name: 'Test 1-1-1',
                path: '/page-1'
              },
              {
                id: '1-1-2',
                name: 'Test 1-1-1',
                path: '/page-1'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Test 2',
        children: [
          {
            id: '2-1',
            name: 'Test 2-1',
            children: [
              {
                id: '2-1-1',
                name: 'Test 2-1-1',
                path: '/page-1'
              },
              {
                id: '2-1-2',
                name: 'Test 2-1-2',
                path: '/page-1'
              }
            ]
          }
        ]
      }
    ];
  });

  it('Deve executar o método filterOffsetAside()', () => {
    const result: NavbarFullItem[] = [
      {
        id: '1',
        name: 'Test 1',
        children: []
      },
      {
        id: '2',
        name: 'Test 2',
        children: []
      },
    ];

    expect(service.filterOffsetAside(mock, 1)).toEqual(result);
  });

  it('Deve executar o método findLinks() e encontrar um item SEM children', () => {
    const result = [
      {
        id: '2-1-2',
        name: 'Test 2-1-2',
        path: '/page-1'
      },
    ];

    expect(service.findLinks(mock, 'Test 2-1-2')).toEqual(result);
  });

  it('Deve executar o método findLinks() e encontrar um item COM children', () => {
    const result = [
      {
        id: '2-1-1',
        name: 'Test 2-1-1',
        path: '/page-1'
      },
      {
        id: '2-1-2',
        name: 'Test 2-1-2',
        path: '/page-1'
      }
    ];

    expect(service.findLinks(mock, 'Test 2-1')).toEqual(result);
  });

  it('Deve executar o método findLinks() e encontrar NENHUM item', () => {
    expect(service.findLinks(mock, 'Test 4')).toEqual([]);
  });

});
