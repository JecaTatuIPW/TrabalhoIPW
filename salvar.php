<?php
// Arquivo onde o cardápio será salvo
$arquivo = 'cardapio.json';

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados do formulário
    $cardapio = [
        'segunda' => array_map('trim', explode("\n", $_POST['segunda'] ?? '')),
        'terca'   => array_map('trim', explode("\n", $_POST['terca'] ?? '')),
        'quarta'  => array_map('trim', explode("\n", $_POST['quarta'] ?? '')),
        'quinta'  => array_map('trim', explode("\n", $_POST['quinta'] ?? '')),
        'sexta'   => array_map('trim', explode("\n", $_POST['sexta'] ?? ''))
    ];

    // Salva os dados no arquivo JSON
    if (file_put_contents($arquivo, json_encode($cardapio, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo "<script>alert('Cardápio atualizado com sucesso!'); window.location.href = 'atualizar.html';</script>";
    } else {
        echo "<script>alert('Erro ao salvar o cardápio. Verifique permissões.'); history.back();</script>";
    }
} else {
    echo "Acesso inválido.";
}
?>