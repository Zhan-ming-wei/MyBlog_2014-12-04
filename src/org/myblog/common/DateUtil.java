/**  
 * @Title: Demo.java
 * @Package org.yuzheng.date
 * @Description: TODO
 * @author yuzheng.xia
 * @date 2014-1-8 ����10:44:40
 * @version V1.0  
 */
package org.myblog.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.sql.Timestamp;
/**
 * @ClassName: Demo
 * @Description: ����ʱ�����ڵĸ�ʽ��ת��
 * @author yuzheng.xia
 * @date 2014-1-8 ����10:44:40
 */
public class DateUtil
{

	
	public static void main(String[] args) throws Exception
	{
		//���ַ���ת����date����
		String time = "2014-01-08 22:22";
		System.out.println(convertDate(Long.parseLong("1389193877464")));
		
	}
	
	
	/**
	 * @Description���SimpleDateFormat  
	 * @author bobmeek
	 * @Title getSimpleDateFormat
	 * @param @return
	 * @return SimpleDateFormat    ��������
	 */
	public static SimpleDateFormat getSimpleDateFormat()
	{
		String pattern = "yyyy-MM-dd HH:mm:ss";
		return new SimpleDateFormat(pattern);
	}
	
	/**
	 * @Description ���ַ���ת����date  
	 * @author bobmeek
	 * @Title convertDate
	 * @param @param time
	 * @param @return
	 * @param @throws Exception
	 * @return Date    ��������
	 */
	public static Date convertDate(String time) throws Exception
	{
		return getSimpleDateFormat().parse(time);
	}
	
	/**
	 * @Description ��long ת���� date  
	 * @author bobmeek
	 * @Title convertDate
	 * @param @param time
	 * @param @return
	 * @param @throws Exception
	 * @return Date    ��������
	 */
	public static Date convertDate(long time) throws Exception
	{
		return getSimpleDateFormat().parse(getSimpleDateFormat().format(new Date(time)));
	}
	
	/**
	 * @Description ��date���͵����ڸ�ʽ��  
	 * @author bobmeek
	 * @Title convertDateFormat
	 * @param @param time
	 * @param @return
	 * @param @throws Exception
	 * @return String    ��������
	 */
	public static String convertDateFormat(Date time) throws Exception
	{
		return getSimpleDateFormat().format(time);
	}
	
	/**
	 * @Description  ��date����ת����Timestamp
	 * @author bobmeek
	 * @Title convertTimestamp
	 * @param @param time
	 * @param @return
	 * @param @throws Exception
	 * @return Timestamp    ��������
	 */
    public static Timestamp convertTimestamp(Date time) throws Exception
    {

    	//����һ��String�ַ������� 
    	return convertTimestamp(getSimpleDateFormat().format(time));
    }
    
    /***
     * @Description ��String����ת����Timestamp  
     * @author bobmeek
     * @Title convertTimestamp
     * @param @param time
     * @param @return
     * @param @throws Exception
     * @return Timestamp    ��������
     */
    public static Timestamp convertTimestamp(String time) throws Exception
    {

    	//����һ��long���͵�����
    	return new Timestamp(getSimpleDateFormat().parse(time).getTime());
    }
    
    /**
     * 
     * @Description  ��long����ת����Timestamp
     * @author bobmeek
     * @Title convertTimestamp
     * @param @param time
     * @param @return
     * @param @throws Exception
     * @return Timestamp    ��������
     */
    public static Timestamp convertTimestamp(long time) throws Exception
    {

    	//����һ��Date���͵�����
    	return convertTimestamp(new Date(time));
    }
	
}
