import { Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <div className="container py-5">
        <div className="row g-4">
            <div className="col-md-3">
                <div className="pe-md-4">
                    <h3 className="h4 mb-3 titulo">Daxen Store</h3>
                    <p className="text-muted small">Remeras que definen tu estilo. Remeras modernas, cómodas y diseñadas para destacar en cualquier momento.</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="px-md-3">
                    <h4 className="h5 mb-3 subtitulo">Contacto</h4>
                    <div className="small text-muted">
                        <div className="d-flex align-items-center mb-2">
                            <Phone className="text-lime-800 contact-icon" size={20}/>
                            <span>+591 78087698</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <Mail className="text-lime-800 contact-icon" size={20}/>
                            <span>storedaxen@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-start mb-2">
                            <Clock className="text-lime-800 contact-icon" size={20}/>
                            <div>
                                <p className="mb-1">Lunes-Sábado: 6:30-13:00</p>
                                <p className="mb-0">Domingos: Cerrado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <h4 className="h5 mb-3 subtitulo">Síguenos</h4>
                <div className="d-flex gap-3">
                    <a 
                        href="https://www.facebook.com/profile.php?id=61587809214481" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    {/* <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                    </a> */}
                    <a 
                        href="https://www.tiktok.com/@daxen.store8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label="Síguenos en TikTok"
                        >
                        <i className="bi bi-tiktok"></i>
                    </a>
                </div>
            </div>
            <div className="col-md-3">
                <div className="rounded-lg overflow-hidden border border-slate-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d459.9784755496629!2d-64.3449083!3d-22.7346408!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQ0JzA0LjMiUyA2NMKwMjAnNDEuMSJX!5e0!3m2!1ses!2sbo!4v1772337167741!5m2!1ses!2sbo"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Daxen Store"
                    allow="geolocation *"
                ></iframe>
                </div>
            </div>
        </div>
        <div className="mt-4 pt-4 border-top text-center">
            <p className="small text-muted mb-3">
                © 2026 Daxen Store. Todos los derechos reservados.
            </p>
        </div> 
    </div>
    )  
}
export default Footer;