import React, { useState } from "react";

import {Button, Select} from "@/shared/ui";
import {Option} from "@/types";

interface SelectAndSendProps {
    list: Option[];
    loading: boolean;
    error: boolean;
    onSend: (opt: Option) => void;
}

export const SelectAndSend: React.FC<SelectAndSendProps> = ({
                                                   list,
                                                   loading,
                                                   error,
                                                   onSend,
                                               }) => {
    const [selected, setSelected] = useState<Option | null>(null);

    const noOptions = !loading && list.length === 0;

    return (
        <div>
            {loading && <p>Загружаем список…</p>}
            {error && <p style={{ color: "red" }}>Ошибка загрузки списка</p>}
            {noOptions && <p>Нет доступных опций</p>}

            <Select
                options={list}
                value={selected}
                onChange={setSelected}
                placeholder="Число 1–1000"
                disabled={loading || noOptions}
            />

            <Button
                disabled={!selected}
                onClick={() => selected && onSend(selected)}
            >
                Отправить
            </Button>
        </div>
    );
};
