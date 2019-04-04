# NeoComponents

Usefull Angular components.


## Installation

To install this library, run:

```bash
$ npm i @neocomplexx/ngx-neo-components
```

## Components

### NeoList
Use it for keyboard navigation and command execution inside a list of elements. 

It has three parts, *neo-list*, *neo-list-item*, and *neoListKeydown* directive

```html
<input class="form-control" placeholder="Search..." #input>
<neo-list 
    (leaveItem)="onDeactive($event)"
    (focusItem)="onActive($event)"
    [(activeIndex)]="lastIndexSelected"
    [neoListKeydown]="input" 
    [icommand]="testItemCmd"  
    [commandOnClick]="true" 
    [commandOnEnter]="false">
    <neo-list-item *ngFor="let listItem of items" [item]="listItem">
            {{item.property }}
    </neo-list-item>
</neo-list>
```

#### Outputs
- **leaveItem:** Emit the item that lost focus
- **focusItem:** Emit the focused item
- **activeIndex:** Emit the index number of the focused item

#### Inputs
- **activeIndex:** *(optional)* If it is set, the item with 'index' is focused on init
- **icommand:** *(optional)* An ICommand from [NeoDirectives](https://www.npmjs.com/package/@neocomplexx/ngx-neo-directives)
- **commandOnClick:** *(optional)* If true, command will execute on clicked element (default: true)
- **commandOnEnter:** *(optional)* If true, command will execute on focues element on enter (default: true)
- **typeAhead:** *(optional)* If true, items will be selected with typeAhead input (default: true)
- **typeAheadDelay:** *(optional)* Delay for typeAhead keypress (default: 300)

- **item:** *neo-list-item* Receives the item from list

- **neoListKeydown:** Directive receives a html element to attach keydown events

## Development server
You can run the example project to check the components
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## License

MIT © [Neocomplexx](mailto:info@neocomplexx.com)
