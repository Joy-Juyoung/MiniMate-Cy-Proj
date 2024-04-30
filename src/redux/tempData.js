import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';

export const user = {
  _id: '64df3c064180b81adfe41d4b',
  firstName: 'Bob',
  lastName: 'Kim',
  email: 'joy@test.com',
  verified: true,
  createdAt: '2023-08-18T09:38:14.179Z',
  updatedAt: '2023-08-21T06:46:18.258Z',
  profileUrl:
    'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
  token: 'hZWFmZmU3NmMiLCJpYXQiOjE2OTIwMzY5',
};

export const miniInfo = [
  { name: 'Today visitors', qty: '7' },
  { name: 'New posts', qty: '2' },
  { name: 'New Requests', qty: '0' },
];

export const shopItem = [
  { image: Shop1, name: 'Minime one', cheese: '30', category: 'Minime' },
  { image: Shop2, name: 'Minime one', cheese: '30', category: 'Miniroom' },
  { image: Shop3, name: 'Minime one', cheese: '30', category: 'Skin' },
  { image: Shop4, name: 'Minime one', cheese: '30', category: 'Minime' },
];

export const shopCategory = [
  { name: 'Minime' },
  { name: 'Miniroom' },
  { name: 'Skin' },
  { name: 'Music' },
  { name: 'Font' },
];
