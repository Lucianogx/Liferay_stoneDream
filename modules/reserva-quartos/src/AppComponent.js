import React, { useEffect, useState } from 'react';
import api from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSnowflake, faTv, faUtensils, faSwimmingPool, faCheck } from '@fortawesome/free-solid-svg-icons';

const CARDS_PER_PAGE = 3;

export default function AppComponent(props) {
	const [quartos, setQuartos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);

	useEffect(() => {
		api.get()
			.then(({ data }) => {
				setQuartos(data.items);
				setLoading(false);
			})
			.catch(error => {
				console.error("Erro ao carregar quartos:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="quartos-loading-container">
				<p>Carregando quartos...</p>
			</div>
		);
	}

	// Função utilitária para mapear comodidades para ícones
	const iconesComodidades = {
		'Wi-Fi': faWifi,
		'Ar-condicionado': faSnowflake,
		'TV': faTv,
		'Café da manhã': faUtensils,
		'Piscina': faSwimmingPool
	};

	const totalPages = Math.ceil(quartos.length / CARDS_PER_PAGE);
	const start = page * CARDS_PER_PAGE;
	const end = start + CARDS_PER_PAGE;
	const quartosToShow = quartos.slice(start, end);

	const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
	const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

	return (
		<div className="quartos-wrapper">
			<div className="quartos-grid">
				{quartosToShow.map((item) => (
					<div key={item.id} className="quarto-card">
						{item.id === 34233 ? (
							<a href="/quarto-familia" style={{textDecoration: 'none', color: 'inherit'}}>
								{item.imagemQuarto && item.imagemQuarto.link && (
									<div className="quarto-img-container">
										<img src={item.imagemQuarto.link.href} alt={item.nomeQuarto} />
									</div>
								)}
								<h2 className="quarto-nome">{item.nomeQuarto}</h2>
							</a>
						) : (
							<>
								{item.imagemQuarto && item.imagemQuarto.link && (
									<div className="quarto-img-container">
										<img src={item.imagemQuarto.link.href} alt={item.nomeQuarto} />
									</div>
								)}
								<h2 className="quarto-nome">{item.nomeQuarto}</h2>
							</>
						)}
						<div className="quarto-descricao" dangerouslySetInnerHTML={{__html: item.descricaoQuarto}} />
						<div className="quarto-info">
							<span className="quarto-badge">{item.tipoCama}</span>
							<span>Capacidade: {item.capacidade}</span>
							<span>R$ {item.precoPorNoite?.toFixed(2)} / noite</span>
						</div>
						<div className="quarto-comodidades">
							{(
								Array.isArray(item.comodidades)
									? item.comodidades
									: item.comodidades
										? [item.comodidades]
										: []
							).map((c, idx) => (
								<span key={idx} className="quarto-comodidade">
									<FontAwesomeIcon icon={iconesComodidades[c.name] || faCheck} className="comodidade-icone" /> {c.name}
								</span>
							))}
						</div>
						<div className={`quarto-status ${item.disponivel ? 'disponivel' : 'indisponivel'}`}>{item.disponivel ? 'Disponível' : 'Indisponível'}</div>
					</div>
				))}
			</div>
			<div style={{
				textAlign: 'center',
				marginTop: '2rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '18px'
			}}>
				<button
					onClick={handlePrev}
					disabled={page === 0}
					style={{
						padding: '8px 20px',
						border: 'none',
						borderRadius: '6px',
						backgroundColor: page === 0 ? '#e0e0e0' : '#1976d2',
						color: page === 0 ? '#9e9e9e' : '#fff',
						fontWeight: 600,
						fontSize: '1rem',
						cursor: page === 0 ? 'not-allowed' : 'pointer',
						boxShadow: '0 2px 6px rgba(25, 118, 210, 0.08)',
						transition: 'background 0.2s, color 0.2s'
					}}
				>
					Anterior
				</button>
				<span style={{
					fontSize: '1.1rem',
					color: '#333',
					fontWeight: 500
				}}>
					{page + 1} / {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={page === totalPages - 1}
					style={{
						padding: '8px 20px',
						border: 'none',
						borderRadius: '6px',
						backgroundColor: page === totalPages - 1 ? '#e0e0e0' : '#1976d2',
						color: page === totalPages - 1 ? '#9e9e9e' : '#fff',
						fontWeight: 600,
						fontSize: '1rem',
						cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
						boxShadow: '0 2px 6px rgba(25, 118, 210, 0.08)',
						transition: 'background 0.2s, color 0.2s'
					}}
				>
					Próximo
				</button>
			</div>
		</div>
	);
}
