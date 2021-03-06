/**  
 * @Title: LoginLogoutT.java
 * @Package org.myblog.user.shiro
 * @Description: TODO
 * @author bobmeek
 * @date Jan 19, 2015 11:50:27 AM
 * @version V1.0  
 */
package org.myblog.user.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.util.Factory;
import org.apache.shiro.util.ThreadContext;
import org.apache.shiro.subject.Subject;
import org.junit.After;
import org.junit.Assert;
import org.junit.Test;
/**
 * @ClassName: LoginLogoutT
 * @Description: TODO
 * @author bobmeek
 * @date Jan 19, 2015 11:50:27 AM
 */
public class LoginLogoutT
{
	
	/*@Test
	public void testHelloworld()
	{
		
		
		//
		Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:org/myblog/user/shiro/config/shiro-jdbc-realm.ini");
		SecurityManager securityManager = factory.getInstance();
		SecurityUtils.setSecurityManager(securityManager);
		
		Subject subject = SecurityUtils.getSubject();
		
		UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");
		
		try
		{
			subject.login(token);
			System.out.println(subject.isAuthenticated());
		}
		catch (AuthenticationException e)
		{
			System.out.println("登录错误");
			e.printStackTrace();
		}
		
			
		Assert.assertEquals(true, subject.isAuthenticated());
		//退出
		subject.logout();
		System.out.println(subject.isAuthenticated());
		
	}
	 	@Test
	    public void testCustomRealm() {
	        //1、获取SecurityManager工厂，此处使用Ini配置文件初始化SecurityManager
	        Factory<org.apache.shiro.mgt.SecurityManager> factory =
	                new IniSecurityManagerFactory("classpath:org/myblog/user/shiro/config/shiro-realm.ini");

	        //2、得到SecurityManager实例 并绑定给SecurityUtils
	        org.apache.shiro.mgt.SecurityManager securityManager = factory.getInstance();
	        SecurityUtils.setSecurityManager(securityManager);

	        //3、得到Subject及创建用户名/密码身份验证Token（即用户身份/凭证）
	        Subject subject = SecurityUtils.getSubject();
	        UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");

	        try {
	            //4、登录，即身份验证
	            subject.login(token);
	        } catch (AuthenticationException e) {
	            //5、身份验证失败
	            e.printStackTrace();
	        }

	        Assert.assertEquals(true, subject.isAuthenticated()); //断言用户已经登录

	        //6、退出
	        subject.logout();
	    }



	 	
	 	@Test
	    public void testJDBCRealm() {
	        //1、获取SecurityManager工厂，此处使用Ini配置文件初始化SecurityManager
	        Factory<org.apache.shiro.mgt.SecurityManager> factory =
	                new IniSecurityManagerFactory("classpath:org/myblog/user/shiro/config/shiro-jdbc-realm.ini");

	        //2、得到SecurityManager实例 并绑定给SecurityUtils
	        org.apache.shiro.mgt.SecurityManager securityManager = factory.getInstance();
	        SecurityUtils.setSecurityManager(securityManager);

	        //3、得到Subject及创建用户名/密码身份验证Token（即用户身份/凭证）
	        Subject subject = SecurityUtils.getSubject();
	        UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");

	        try {
	            //4、登录，即身份验证
	            subject.login(token);
	        } catch (AuthenticationException e) {
	            //5、身份验证失败
	            e.printStackTrace();
	        }

	        Assert.assertEquals(true, subject.isAuthenticated()); //断言用户已经登录

	        //6、退出
	        subject.logout();
	    }
	 	
	 	
	 	
	 	 @After
	     public void tearDown() throws Exception {
	         ThreadContext.unbindSubject();//退出时请解除绑定Subject到线程 否则对下次测试造成影响
	     }*/


	
}
