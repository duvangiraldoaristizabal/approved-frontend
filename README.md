# Approved Frontend

Cliente Angular 19 para el flujo generico de aprobaciones. Incluye bandeja por responsable, filtros de estado, creacion, detalle, decision e historial.

## Ejecutar

Con la API disponible en `http://localhost:3000`:

```bash
npm install
npm start
```

Abra `http://localhost:4200`. El selector superior simula usuarios de red; use el responsable de una solicitud para aprobarla o rechazarla.

## Verificar

```bash
npm run build
npm test -- --watch=false
```

Angular utiliza TypeScript como lenguaje soportado y lo transpila a JavaScript para el navegador. Los componentes son standalone, las rutas cargan de forma diferida y la comunicacion HTTP esta encapsulada en `ApprovalApiService`.
