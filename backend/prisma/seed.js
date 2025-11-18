import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash password for all artists
  const hashedPassword = await bcrypt.hash('senha123', 10);

  // Marina Sena
  const marinaSena = await prisma.artista.upsert({
    where: { email: 'marina.sena@sonora.com' },
    update: {},
    create: {
      nome: 'Marina Sena',
      genero_musical: 'MPB/Pop',
      bio: 'Guiada por sua paixão pelo canto, Marina Sena sempre soube a que veio. A cantora e compositora mineira conquistou o país com seu carisma, gingado e timbre inconfundível ao unir ritmos como samba, reggae, axé, MPB e dancehall em um pop autêntico e irresistível. Com uma trajetória marcada por projetos plurais - da sonoridade psicodélica d\'A Outra Banda da Lua ao frescor indie-pop do Rosa Neon - Marina lançou-se em carreira solo com De Primeira (2021), um álbum de estreia arrebatador que traduziu o calor da paixão e do desejo em melodias envolventes.',
      rede_social: [
        'https://open.spotify.com/intl-pt/artist/0nFdWpwl7h6fp3ADRyG14L',
        'https://www.instagram.com/amarinasena',
        'https://www.facebook.com/amarinasena2/?locale=pt_BR',
        'https://twitter.com/amarinasena'
      ],
      email: 'marina.sena@sonora.com',
      senha: hashedPassword,
      telefone: '(11) 98765-4321'
    }
  });

  // Ebony
  const ebony = await prisma.artista.upsert({
    where: { email: 'ebony@sonora.com' },
    update: {},
    create: {
      nome: 'Ebony',
      genero_musical: 'Pop/R&B',
      bio: 'Ebony é uma cantora brasileira que mescla elementos do pop, R&B e soul em suas composições. Com uma voz marcante e performances envolventes, ela se destaca no cenário musical nacional trazendo uma sonoridade moderna e autêntica. Suas músicas exploram temas de empoderamento, amor e auto-descoberta.',
      rede_social: [
        'https://www.instagram.com/ebonyoficial',
        'https://open.spotify.com/artist/ebony'
      ],
      email: 'ebony@sonora.com',
      senha: hashedPassword,
      telefone: '(11) 98765-1234'
    }
  });

  // Duquesa
  const duquesa = await prisma.artista.upsert({
    where: { email: 'duquesa@sonora.com' },
    update: {},
    create: {
      nome: 'Duquesa',
      genero_musical: 'Rap/Hip-Hop',
      bio: 'Duquesa é uma rapper brasileira que se destaca pela sua lírica afiada e flow único. Reconhecida como uma das vozes mais importantes do rap nacional feminino, ela usa suas músicas para abordar questões sociais, igualdade e empoderamento. Com uma presença de palco magnética e rimas poderosas, Duquesa conquistou seu espaço no cenário do hip-hop brasileiro.',
      rede_social: [
        'https://www.instagram.com/duquesareal',
        'https://open.spotify.com/artist/duquesa',
        'https://www.youtube.com/duquesa'
      ],
      email: 'duquesa@sonora.com',
      senha: hashedPassword,
      telefone: '(11) 98765-5678'
    }
  });

  console.log('✅ Seed completed successfully!');
  console.log('Created/Updated artists:');
  console.log('- Marina Sena:', marinaSena.id);
  console.log('- Ebony:', ebony.id);
  console.log('- Duquesa:', duquesa.id);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
