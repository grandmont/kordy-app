import faker from 'faker';

export const fakePosts = [...Array(5).keys()].map((i) => {
    const [hasContent, hasImages] = [...Array(2).keys()].map(
        () => Math.random() >= 0.5,
    );

    const images = hasImages
        ? [...Array(faker.random.number(5))].map((i) => ({
              key: faker.random.image(),
          }))
        : [];

    return {
        id: i,
        user: {
            kordy: faker.internet.userName().toLowerCase(),
            profile: faker.internet.avatar(),
        },
        content:
            ((!hasContent && !hasImages) || hasContent) && faker.random.words(),
        images,
    };
});
