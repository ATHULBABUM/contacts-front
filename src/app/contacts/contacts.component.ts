import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;

  constructor(private contactService: ContactService) { }
  // contact = any;

  addContact() {
    const newcontact ={
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newcontact)
      .subscribe((contact) => {
        this.contacts.push(contact);
      });
      this.contactService.getContacts()
      .subscribe(newcontacts => {
        this.contacts = JSON.parse(JSON.stringify(newcontacts));
      });
  }

  deleteContact(id:any) {
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if(data == 1) {
          for(var i=0; i<this.contacts.length; i++) {
            if(contacts[i]._id == id) {
              contacts.splice(i,1);
            }
          }
        }
        this.contactService.getContacts()
        .subscribe(newcontacts => {
          this.contacts = JSON.parse(JSON.stringify(newcontacts));
        });
      })
  }

  ngOnInit() {
    this.contactService.getContacts()
    .subscribe(newcontacts => {
      this.contacts = JSON.parse(JSON.stringify(newcontacts));
    });
  }

}
