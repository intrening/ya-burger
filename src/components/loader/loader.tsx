import React from 'react';
import styles from './loader.module.css';

interface LoaderProps {
	text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Загрузка...' }) => (
	<section className={styles.loaderContainer}>
		<div className={styles.loader}></div>
		<span className={styles.loaderText}>{text}</span>
	</section>
);

export default Loader;
