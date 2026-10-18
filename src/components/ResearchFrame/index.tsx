import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

type ResearchFrameProps = {
  slug: string;
  title: string;
};

export default function ResearchFrame({ slug, title }: ResearchFrameProps) {
  const src = useBaseUrl(`/research/${slug}/`);

  return (
    <figure className={styles.frame}>
      <iframe className={styles.view} src={src} title={title} />
      <a className={styles.open} href={src}>
        Open full page
      </a>
    </figure>
  );
}
