export default function HeaderComponent() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-1 justify-between text-center max-w-7xl py-4">
        <div className="flex text-center items-center gap-2">
          {/* TODO inserir logo */}
          <div className="h-8 w-8 flex justify-center text-center items-center rounded-md bg-primary text-white font-bold">
            TD
          </div>
          <h1 className="font-bold">Teste Doqr</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* TODO Inserir avatar */}
          <div className="w-6 h-6 bg-avatar rounded-full"></div>
          {/* TODO Carregar informações do usuário */}
          <h2 className="font-bold">Mario</h2>
        </div>
      </div>
    </div>
  );
}
