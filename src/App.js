import logo from './logo.svg';
import styles from './App.module.css';
import { useState } from 'react';

export default function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	function onInputButtonClick() {
		const promptValue = prompt('');
		if (promptValue.trim().length < 3) {
			setValue('');
			setError('Введенное значение должно содержать минимум 3 символа');
			console.log(error);
		} else {
			setValue(promptValue);
			setError('');
		}
	}

	function isValueValid(value) {
		if (value.trim().length < 3) {
			return false;
		} else {
			return true;
		}
	}

	function onAddButtonClick() {
		if (isValueValid(value)) {
			const updatedList = [...list, { id: Date.now(), value }];
			setList(updatedList);
			setValue('');
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	}

	const emptyList = (
		<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
	);

	const newListElement = (
		<ul className={styles.list}>
			{list.map((item) => (
				<li key={item.id} className={styles['list-item']}>
					{item.value}
				</li>
			))}
		</ul>
	);

	return (
		<body>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>: "
					<output className={styles['current-value']}>{value}</output>"
				</p>
				{error !== '' && <div className={styles.error}>{error}</div>}
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid(value)}
						isActive={isValueValid(value)}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>

					{list.length > 0 ? newListElement : emptyList}
				</div>
			</div>
		</body>
	);
}
