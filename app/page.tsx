import Image from 'next/image';
import { sql } from '../database/connect';
import styles from './page.module.css';

type Logo = {
  id: number;
  name: string;
};

export default async function Home() {
  const logos = await sql<Logo[]>`SELECT * FROM logos`;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        {logos.map((logo) => (
          <div key={`logo-${logo.id}`}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
            <br />
            {logo.name}
          </div>
        ))}
      </div>
    </main>
  );
}
