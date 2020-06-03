<?php
switch($_SERVER['PATH_INFO']) {
    case '/scores':
        $data = file_get_contents('php://input');
        $score = json_decode($data, true);
        if ($_REQUEST['tag'] == 'score') {
            file_put_contents(__DIR__ . '/ags/score.txt', $score['scoreGiven']);
            file_put_contents(__DIR__ . '/ags/comment.txt', $score['comment']);
        } else {
            file_put_contents(__DIR__ . '/ags/time.txt', $score['scoreGiven']);
        }
        var_dump($score);
        echo $data;
    break;
    case '/results':
        if ($_REQUEST['tag'] == "score") {
            echo json_encode([
                [
                    "id" => "https://lms.example.com/context/2923/lineitems/1/results/5323497",
                    "userId" => "0ae836b9-7fc9-4060-006f-27b2066ac545",
                    "resultScore" => file_get_contents(__DIR__ . '/ags/score.txt') ?: 0,
                    "comment" => file_get_contents(__DIR__ . '/ags/comment.txt') ?: 0,
                    "resultMaximum" => 108,
                ],
                [
                    "id" => "https://lms.example.com/context/2923/lineitems/1/results/5323497",
                    "userId" => "4d0b3941-83f5-47fe-bd8a-66b39aa0651d",
                    "resultScore" => 60,
                    "comment" => '00004i94i94i95mrdmrd4i9dmrdmr4i94idmrdki9dmrci94jdmrd4i95'
                        .'mrci94i94i94i95mrci94i94i94jdmrdmq94i94i94i9dmrci94i94i94i94irdi9'
                        .'4i96rdmr94i94i94irdmrdmrdmrdmrci94ibdmp4i94i94i94i94i94i94i94i94i'
                        .'94i94i0002900000000000294ib94i96rdmrdmi94i94i9dmrd4i0000094i94g0i'
                        .'94i8000002rdmr4i94i94i94i94i94mr4i95mp4i94i94i94mrdmp4i94i94i96rd'
                        .'mi94i94jdmrdmrdmrdmrdmrdmrdmrdmrddmrdmrdm94i94i94i94mrdmrdmrdrdmr'
                        .'dmrdmrdmrdmrdmrd4i9dmrcidmrdmq94i9dmrdi94irdmp4ibdmrdmrdmrdmrdmrd'
                        .'mrdmrdidmrdmrd4i94i94idmrd4i95mrdm94i94mp4irci94i9mrdmq94i95mrdmp'
                        .'4idmq94i9dmrdmrdmrdmr4i94i94i94i94i94i94irdmrdmrdmrdmrci94i94mrdm'
                        .'rdmrdmrdmrdmr4idmrdmrdmrdmq94i94i94rdmrdmqbdmrdmrdmrdmrci94i94ird'
                        .'mrdmrdmrdmrci94i94i94i94i94i94i94i96rdmrdmrdmrdmrdmrdmrdmrdmrdmr9'
                        .'4irdmp4i95mr4i94irdm94irdmp4i94i94i94i94i94irdmrdmrdmp4i94jdmrdki'
                        .'94i94i94i95mrdmrci94i94i94i94i94i94i94rdmrdmrdmq94i96rdmrdmrdmrdm'
                        .'q94i94i94i94mr6rdmrdmrdmr94i94i9dmrci94i94mrdi94rdmq96rdmrdmrdmrd'
                        .'mrdmr9dmr4i9mrdmq94i94i95mrdi94i9mrdmrd4i94mrdmrdmrdmrdmr4i94irdm'
                        .'94ibdm94i94i96rdmrdki9dmr4i9mrdmrdmrdmrdmq94i94rdmq94i94i96rdmrdm'
                        .'rdmrdmrdmrd5mrdm94i96rdmrdmrdmrdmrdmi94i95mrdmp4i94i94i94i94i94i9'
                        .'4i94i94i94mrdmrdmrdmrdmr4i94i94i94i94i94i94i9dmrdmrdmrdmrdmrdmr4i'
                        .'94i9dmrdmr4jdmrdmrdmrdmrdmrdmrdki94i94i94irdm94i94rdmrdmrd4i94i94'
                        .'i96rdmrdmrdmrd4i94i94i94i94i94i94i94i94ibdmr4i96rdmr94idkirdmp4i9'
                        .'4jdmrd4mr4i95i94rdmr94i94idmrd4i95mrci94i96rdmq94i9dmr4i94jdmrd4i'
                        .'9mrd4idmrdmrdmrdmrdkidmi94i94i94i94ibdmrdi94i94i94i94i94i94i94i94'
                        .'i94i9circi94ibdmrdm94i9dmrdmrdmrdmrdmrci94i94irdm94jdmi94mrcibdi9'
                        .'4i94idmrdkibdmp4i94rdmi94jdmrdmq94i95mrcidmrd4i94mrci95mp4jdmrdmr'
                        .'dmq94i96rdki94i95mr4i95mrci94i94i94i94i94irdmp4i9dmrdmdmrdmrdki94'
                        .'i9mrdmrdmr94i94i94i94ibdm94i94i9dmrdmrdmrdmrdjdmrdmi94i95mvmrdmr9'
                        .'4i9mrdmi94i9dmrci94i96rdki94rdmrdmrdmrdmr94mrdi94mrdi96rdmrd4i95m'
                        .'rcibdm94jdmr94i9mrdki94idmrdmq94i94i94i94i94irdmr4jdmrdmrdki94i94'
                        .'i94i94i94i94i94i94i95mrdmrdmrdi9mrdmi94i9dmp4i94i94i94i94irdmrdmr'
                        .'dmrdmrdmrdmrdi95mrdmrdmrci94i94i94mrdmr4i9dm96rdmi94jdkmrcibdmp4m'
                        .'rdmrdmrdmrdmrdi9mrdmi9dmp4i94i94i94i94idmrd4i94i94i9dmr4i9drdmrdm'
                        .'rd4i94rdmq94i94mp6rdmi96rdki94i94rdmq94mrdmrci96r94mrdmrdmrdmrdmr'
                        .'dm94i9mrd4i9dmrdmrdmrdi94i9mrdmrdmrdki94rdmrdmrdmq94i94ibdmrdmrdm'
                        .'rdmp4i9mrdmr94i95mrdmrdmrdi96rd5mrdmrdmrdmrdmrdi94idmi94irdi95mp4'
                        .'irci94i94i94i94i94mrdmrdmp4i94i94i94i95mrci94idmrdmrdki94i94i94jd'
                        .'mrd4i94i94i94i94i94rdmrdmrdmi94i95mrdmp4i96rdmrdmrd4i94i94i94i94i'
                        .'94i94idmrdmrdmrdki94i96rdmrdmq94i96r94i94i94i94i94mrdi94irdi94rdm'
                        .'r94i95mr4i94i94mrcibdmrdidmrd4i94irdm94irdmp4idmrdmq94mrdmrdmrdmr'
                        .'dmp4rdmq94jdmrdmrdmrdmrdki94i94i94jdmrdki94i9dmr4i94i96rdmr94i94i'
                        .'94i94jdmrdmrdmi94i94idmrdmrdki94i94jdki94i94i9mrdki94i94i94i94i94'
                        .'mrdi94jdmrd4i94mrdm94idmq94mrdi94idmrd4i94i94i94i9dmrdm94i94i94i9'
                        .'dmrdmp4jdmrd4mrdm94i94rdmrdmrd4i94ibdmrd000',
                    "resultMaximum" => 108,
                ]
            ]);
        } else {
            echo json_encode([
                [
                    "id" => "https://lms.example.com/context/2923/lineitems/1/results/5323497",
                    "userId" => "0ae836b9-7fc9-4060-006f-27b2066ac545",
                    "resultScore" => file_get_contents(__DIR__ . '/ags/time.txt') ?: 0,
                    "resultMaximum" => 999,
                ],
                [
                    "id" => "https://lms.example.com/context/2923/lineitems/1/results/5323497",
                    "userId" => "4d0b3941-83f5-47fe-bd8a-66b39aa0651d",
                    "resultScore" => 82,
                    "resultMaximum" => 999,
                ]
            ]);
        }
    break;
}
?>