<?php
echo json_encode([
    "id" => "http://localhost:9001/platform/nrps.php",
    "members" => [
        [
            "status" => "Active",
            "context_id" => "2923-abc",
            "name" => "Trudie Senaida",
            "given_name" => "Trudie",
            "family_name" => "Senaida",
            "user_id" => "0ae836b9-7fc9-4060-006f-27b2066ac545",
            "roles" => [
                "Instructor"
            ],
            "group_enrollments" => [
                ["group_id" => "4b8ae5e8-4de4-438f-92d3-6b856195293b"]
            ],
            "message" => []
        ],
        [
            "status" => "Active",
            "context_id" => "2923-abc",
            "name" => "Marget Elke",
            "given_name" => "Marget",
            "family_name" => "Elke",
            "user_id" => "4d0b3941-83f5-47fe-bd8a-66b39aa0651d",
            "roles" => [
                "Instructor"
            ],
            "group_enrollments" => [
                ["group_id" => "b2edddff-6dcc-4372-9f2c-410f954ba48f"]
            ],
            "message" => []
        ]
    ]

]);
?>