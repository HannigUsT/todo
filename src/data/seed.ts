import prisma from '../database/prisma';

// Mock do user com os privilegios para fazer as requisicoes
const users = [
  {
    username: 'employee',
    password: 'employee_password',
    permissions: [
      'create_todo',
      'edit_todo',
      'delete_todo',
      'finish_todo',
      'unfineshed_todo',
      'finished_todo',
      'revert_todo',
      'list_todo',
      'get_todo',
    ],
  },
];

export const seed = async () => {
  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { username: user.username },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: user,
      });
      console.log(`User ${user.username} created`);
    }
  }
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
