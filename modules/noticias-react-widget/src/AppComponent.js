import React, { useEffect, useState } from 'react';
import api from './api';

export default function AppComponent(props) {
	const [news, setNews] = useState([]);

	const [loading, setLoading] = useState(true);

	const [autor, setautor] = useState("");
	const [subtitulo, setsubtitulo] = useState("");
	const [tipoDeNoticia, settipoDeNoticia] = useState(0);
	const [titulo, settitulo] = useState("");

	useEffect(() => {
		api.get()
			.then(({ data }) => {
				setNews(data.items);
				setLoading(false);
			})
			.catch(error => {
				console.error("Erro ao carregar notícias:", error);
				setLoading(false);
			});
	}, []);


	if (loading) {
		return (
			<div className="custom-loading-container">
				<p>Carregando notícias...</p>
			</div>
		);
	}

	return (
		<div className="custom-news-wrapper">
			<div className="custom-news-grid">
			{news.slice(0, props.configuration?.system?.number + 1 || 10).map((item) => (
				<div key={item.id} className="custom-news-container">
					<span className="custom-news-badge">Tipo {item.tipoDeNoticia}</span>
					{item.imagem && (
						<div className="custom-news-image-container">
							<img src={item.imagem} alt={item.titulo} />
						</div>
					)}
					<h2>{item.titulo}</h2>
					<p className="custom-news-content-text">{item.subtitulo}</p>
					<div className="custom-news-info">
						<span className="news-author">
							<span className="news-icon" role="img" aria-label="autor">👤</span> {item.autor}
						</span>
						<span className="news-date">
							<span className="news-icon" role="img" aria-label="data">🗓️</span> {item.createDate}
						</span>
					</div>
				</div>
			))}
			</div>
			<button className="custom-news-badge" style={{marginTop: 32}} onClick={() => api.post({
				autor: autor,
				subtitulo: "campo de subtitulo",
				tipoDeNoticia: 1,
				titulo: "titulo"
			})}>Enviar</button>
		</div>
	);
}