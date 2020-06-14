import faker from 'faker';

export const fakePosts = [1, 2, 3].map((i) => ({
    id: i,
    name: faker.internet.userName(),
}));
