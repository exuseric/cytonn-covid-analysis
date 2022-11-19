import formatNumber from "../../lib/formatNumbers";
import styles from "../../styles/AnalysisTable.module.css";

const StackedData = ({ stack }) => {
  return (
    <td className={styles.stack}>
      {Object.entries(stack).map((s, idx) => (
        <p key={idx} className={styles.stack__body}>
          <span>{s[0]}:&nbsp;</span>
          <small>{formatNumber(s[1])}</small>
        </p>
      ))}
    </td>
  );
};
export default StackedData;
