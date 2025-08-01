import {
  IDialog,
} from '../../../../shared/components/dialog/dialog.component';
import { Card } from '../../../../types';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

export class ProjectListCardBase {
  loading: boolean = false;

  newCardDialogData: IDialog = {
    header: `Add new Card`,
    goButtonLabel: 'Add',
    inputId: 'card',
    inputLabel: 'Card Name',
    inputModel: '',
    returnButtonLabel: 'Cancel',
    visible: false,
  };

  editListDialogData: IDialog = {
    header: `Edit List`,
    goButtonLabel: 'Update',
    inputId: 'listEdit',
    inputLabel: 'Title',
    inputModel: '',
    returnButtonLabel: 'Cancel',
    visible: false,
  };

  items: MenuItem[] = [
    {
      id: 'edit_list',
      label: 'Edit',
      icon: 'pi pi-pen-to-square',
      command: () => this.showEditListDialog(),
    },
    {
      id: 'delete_list',
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.onDeleteList(),
      styleClass: 'deleteOption',
      iconStyle: {
        color: 'red',
      },
    },
  ];

  cardDialogVisible = false;

  selectedCard: Card = {} as Card;

  sectionSubscription: Subscription | undefined;

  showEditListDialog(): void {}

  onDeleteList(): void {}
}
