import React, { useState } from "react";
import style from "./style.module.scss";

const initialValues = {
  time: "",
  value: ""
};

const timeOptions = [];

// Добавляем значения каждые две минуты до 20 минут
for (let i = 2; i <= 20; i += 2) {
  timeOptions.push(`${i.toString().padStart(2, '0')}:00`);
}

// Добавляем значения каждые три минуты после 20 минут
for (let i = 23; i <= 31; i += 3) {
  timeOptions.push(`${i.toString().padStart(2, '0')}:00`);
}

export default function UploadFilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentValues, setCurrentValues] = useState(Array(9).fill(initialValues));

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDeleteRow = (index) => {
    const updatedValues = [...currentValues];
    updatedValues.splice(index, 1);
    setCurrentValues(updatedValues);
  };

  const handleAddRow = () => {
    setCurrentValues(prevValues => [...prevValues, { ...initialValues }]);
  };

  const handleClearForm = () => {
    setCurrentValues(Array(9).fill(initialValues));
    setSelectedFile(null);
  };

  const handleTimeChange = (e, index) => {
    const { value } = e.target;
    setCurrentValues(prevValues => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], time: value };
      return updatedValues;
    });
  };

  const handleValueChange = (e, index) => {
    const { value } = e.target;
    setCurrentValues(prevValues => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: value };
      return updatedValues;
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.nprogress_container}></div>
      <section className={style.app_main}>
        <div className={`${style.container} ${style.is_fluid} ${style.is_marginless} ${style.app_content}`}>
          <div className={style.animated}>
            <div className={`${style.tile} ${style.is_ancestor}`}>
              <div className={`${style.tile} ${style.is_parent}`}>
                <div className={style.spinner} style={{ display: "none" }}>
                  <div className={style.dotl}></div>
                  <div className={style.dot2}></div>
                </div>
                <article className={`${style.tile} ${style.is_child} ${style.box} ${style.article}`}>
                  <h1 className={`${style.title}`}>Функциональное тестирование</h1>
                  <div className={style.is_pulled_right}>
                    <button className={`${style.button} ${style.is_small} ${style.is_striped} ${style.clearButton}`} onClick={handleClearForm}>Очистить форму</button>
                  </div>
                  <div className="is-clearfix"></div>
                  <form className={style.block}>
                    <div className={style.control}>
                      <label className={style.label}>Patient Id</label>
                      <input type="number" data-vv-name="pid" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Файл с данными (xls, xlsx)</label>
                      <div className={style.control}>
                      <input type="file" name="file" accept=".xls, .xlsx, .ods" className={`${style.input}`} aria-required="true" aria-invalid="false" style={{ paddingTop: "5px" }} onChange={handleFileChange} />
                      </div>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}></label>
                      <div className={style.control}>
                        <table className={`${style.table}`}>
                          <thead>
                            <tr>
                              <th colSpan="2">Абсолютные значения массы</th>
                              <th rowSpan="2">Прилизительное значение основного обмена (ккал)</th>
                            </tr>
                            <tr>
                              <th>Жировая, кг</th>
                              <th>Мышечная, кг</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input type="text" data-vv-name="inBody_absolute_fat_mass_Kg" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td>
                                <input type="text" data-vv-name="inBody_absolute_fat_mass_Kg" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td>
                                <input type="text" data-vv-name="inBody_absolute_fat_mass_Kg" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Шкала Борга</label>
                      <span className={`${style.select}`}>
                        <select data-vv-name="scale borg" className={`${style.input}`} aria-required="true" aria-invalid="false">
                          {[...Array(10)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Лактат</label>
                      <div className={style.control}>
                        <a href="#" className={`${style.button} ${style.is_success}`} onClick={handleAddRow}>Добавить значение</a>
                        <table className={`${style.table}`}>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Время появления капли крови из пальца</th>
                              <th>Значение лактата с прибора</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentValues.map((row, index) => (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>
                                  <input value={row.time || timeOptions[index]} onChange={(e) => handleTimeChange(e, index)} data-vv-name={`la_time_${index}`} className={`${style.input}`} aria-required="true" aria-invalid="false" />
                                </td>
                                <td>
                                  <input value={row.value} onChange={(e) => handleValueChange(e, index)} type="text" data-vv-name={`la_value_${index}`} className={`${style.input}`} aria-required="true" aria-invalid="false" />
                                </td>
                                <td>
                                  <a href="#" tabIndex="-1">
                                    <span className={`${style.icon}`}>
                                      <button className={`${style.button} ${style.delete_btn} ${style.is_success}`} onClick={() => handleDeleteRow(index)}>Удалить</button>
                                    </span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Лактат (восстановление)</label>
                      <div className={style.control}>
                        <table className={`${style.table}`}>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Время появления капли крови из пальца</th>
                              <th>Значение лактата с прибора</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>3 минута</td>
                              <td>
                                <input data-vv-name="recovery_la_time_0" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td>
                                <input type="text" data-vv-name="recovery_la_value_0" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>5 минутa</td>
                              <td>
                                <input data-vv-name="recovery_la_time_1" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td>
                                <input type="text" data-vv-name="recovery_la_value_1" className={`${style.input}`} aria-required="true" aria-invalid="false" />
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Описание Kг</label>
                      <textarea className={`${style.textarea}`}></textarea>
                    </div>
                    <div className={style.control}>
                      <label className={style.label}>Kомментарии</label>
                      <textarea className={`${style.textarea}`}></textarea>
                    </div>
                    <div className={style.control}>
                      <div className={`${style.control} ${style.is_grouped}`}>
                        <p className={style.control}>
                          <button className={`${style.button} ${style.is_primary} ${style.primaryButton}`}>
                            <span>Сreнеpировать</span>
                          </button>
                        </p>
                        <p className={style.control}>
                          {/* Дополнительные элементы формы */}
                        </p>
                      </div>
                    </div>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}