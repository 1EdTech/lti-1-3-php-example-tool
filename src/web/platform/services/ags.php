<?php
switch($_SERVER['PATH_INFO']) {
    case '/scores':
        $data = file_get_contents('php://input');
        $score = json_decode($data, true);
        if ($_REQUEST['tag'] == 'score') {
            file_put_contents(__DIR__ . '/ags/score.txt', $score['scoreGiven']);
        } else {
            file_put_contents(__DIR__ . '/ags/time.txt', $score['scoreGiven']);
        }
        $_SESSION['my_test'] = 3;
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
                    "resultMaximum" => 108,
                ],
                [
                    "id" => "https://lms.example.com/context/2923/lineitems/1/results/5323497",
                    "userId" => "4d0b3941-83f5-47fe-bd8a-66b39aa0651d",
                    "resultScore" => 60,
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