import faker from 'faker';

export const fakePosts = [...Array(5).keys()].map((i) => ({
    id: i,
    user: {
        kordy: faker.internet.userName(),
    },
    content: faker.random.words(),
}));
