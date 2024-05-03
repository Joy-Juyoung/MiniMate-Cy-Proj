import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';
import Minime from '../assets/minime(23).gif';

export const userData = {
  _id: '64df3c064180b81adfe41d4b',
  email: 'joy@test.com',
  password: 'Test123',
  username: 'Joy',
  minime: Minime,
  createdAt: '2023-08-18T09:38:14.179Z',
  updatedAt: '2023-08-21T06:46:18.258Z',
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

export const myHome = {
  id: 1,
  domain: 'izoi_213',
  today: 12,
  total: 12345,
  title: 'Welcome to Joy Home',
};

export const navItems = [
  { id: 1, name: 'Home', link: '/home' },
  { id: 2, name: 'Photo', link: '/photo' },
  { id: 3, name: 'Video', link: '/video' },
  { id: 4, name: 'Diary', link: '/diary' },
  { id: 5, name: 'Visitor', link: '/visitor' },
  { id: 6, name: 'Setting', link: '/setting' },
];

export const mateList = [
  {
    name: 'Jenny Park',
    nickname: 'best',
  },
  {
    name: 'Jenny Park',
    nickname: 'best',
  },
  {
    name: 'Jenny Park',
    nickname: 'best',
  },
  {
    name: 'Jenny Park',
    nickname: 'best',
  },
];

export const managePosts = [
  { name: 'Photo', total: 175, new: 12 },
  { name: 'Video', total: 175, new: 0 },
  { name: 'Diary', total: 175, new: 1 },
  { name: 'Visitor', total: 175, new: 3 },
  { name: 'Post', total: 175, new: 0 },
  { name: 'Music', total: 175, new: 0 },
];
