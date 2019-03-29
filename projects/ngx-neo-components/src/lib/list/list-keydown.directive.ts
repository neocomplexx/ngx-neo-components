import { Directive, QueryList, AfterViewInit, ContentChildren, ElementRef, Input, Renderer, OnDestroy } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Labeled, ListItemComponent } from './list-item.component';

@Directive({
  selector: '[neoListKeydown]'
})
export class ListKeydownDirective implements AfterViewInit, OnDestroy {

  @ContentChildren(ListItemComponent) public items: QueryList<ListItemComponent<Labeled>>;
  @Input('neoListKeydown') htmlElement: ElementRef;

  private listenerFunction: Function;

  public keyManager: ActiveDescendantKeyManager<ListItemComponent<Labeled>>;

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items);
    if (this.htmlElement) {
      // Retorna la funcion para destruir el oyente
      this.listenerFunction = this.renderer.listen(this.htmlElement, 'keydown', (event: KeyboardEvent) => {
        if (this.keyManager) {
          const active = this.keyManager.activeItemIndex;
          switch (event.keyCode) {
            case 33:
              event.preventDefault();
              if (this.keyManager.activeItemIndex - 10 >= 0) {
                this.keyManager.setActiveItem(active - 10);
              } else {
                this.keyManager.setFirstItemActive();
              }
              break;
            case 34:
              event.preventDefault();
              if (this.keyManager.activeItemIndex + 10 < this.items.length) {
                this.keyManager.setActiveItem(active + 10);
              } else {
                this.keyManager.setLastItemActive();
              }
              break;
            case 35:
              this.keyManager.setLastItemActive();
              break;
            case 36:
              this.keyManager.setFirstItemActive();
              break;
            default:
              this.keyManager.onKeydown(event);
          }
        } else {
          throw Error('keyManager was not setted in neoListKeydown');
        }
      });
    } else {
      throw Error('htmlInput listener was not setted in neoListKeydown');
    }
  }

  ngOnDestroy() {
    this.listenerFunction();
  }
}
